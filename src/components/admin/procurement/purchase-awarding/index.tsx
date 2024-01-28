"use client";
//libs
import { PrinterOutlined } from "@ant-design/icons";
import { Button, Divider, Empty, Result, Segmented, Skeleton } from "antd";
import { CSSProperties, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import useSWR from "swr";
//components
import NetworkError from "@components/network-error";
import SubHeader from "@components/admin/layouts/procurement-item/header/sub";
import Preview from "@components/admin/layouts/procurement-item/preview-wrapper";
import PreviewHeader from "@components/admin/layouts/procurement-item/preview-wrapper/header";
import { usePRId } from "@components/admin/procurement/purchase-id-context";
//Preview
import Resolution from "./resolution";
import NoticeOfAward from "./notice-of-award";
import DocumentType from "./picker";
import MakeFinal from "./final";
//configs
const WrapperStyles: CSSProperties = {
    display: "grid",
    gridTemplateRows: "56px 1fr",
    width: "100%",
    height: "calc(100vh - 112px)",
};
//
const PurchaseAwarding = function () {
    const prId = usePRId(); //PR ID
    const [documentType, setDocumentType] = useState<"review" | "approve" | "notice">("review");
    //handle printing
    const printableComponent = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => printableComponent.current,
    });

    //FETCH Resource
    const { data, isLoading, error, isValidating } = useSWR(
        `/administrator/api/procurement/award?_id=${encodeURIComponent(prId)}`
    );

    if (error) {
        return <NetworkError />;
    }
    if (isLoading || !data) {
        return <Skeleton active />;
    } else {
        if (data?.empty === true) {
            return (
                <>
                    <Result
                        status={"404"}
                        title="No Awarding Document"
                        subTitle="Please Create An Abstract of Quotation"
                    />
                </>
            );
        } else {
            return (
                <>
                    <div style={WrapperStyles}>
                        <SubHeader
                            leading={<MakeFinal final={data.final} abstractFinal={data.abstractFinal} id={data.id} />}
                        >
                            <DocumentType onChange={(e: any) => setDocumentType(e)} />
                            <Divider type="vertical" />
                            <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                                Print
                            </Button>
                        </SubHeader>

                        <Preview ref={printableComponent}>
                            <PreviewHeader height={100}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100%",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "1.2em",
                                            fontWeight: "bold",
                                            width: 700,
                                            textAlign: "center",
                                        }}
                                    >
                                        <br />
                                        {
                                            {
                                                approve: `Approve BAC Recommendation for Award`,
                                                review: "BAC Resolution Recommending for Award",
                                                notice: (
                                                    <>
                                                        <div style={{ fontSize: ".9em", fontWeight: "normal" }}>
                                                            BIDS & AWARDS COMMITTEE
                                                        </div>
                                                        <div>NOTICE OF AWARD</div>
                                                    </>
                                                ),
                                            }[documentType]
                                        }
                                    </div>
                                </div>
                            </PreviewHeader>
                            <div>{/*Empty Block Accomodate for the Layout of this Preview having Four Children*/}</div>
                            {documentType === "notice" ? (
                                <NoticeOfAward
                                    amount={data.amount}
                                    supplier={data.supplier}
                                    purpose={data.purpose}
                                    number={data.number}
                                    reference={data.reference}
                                    date={data.rfqDate}
                                />
                            ) : (
                                <Resolution type={documentType} data={data} />
                            )}
                        </Preview>
                    </div>
                </>
            );
        }
    }
};

export default PurchaseAwarding;
