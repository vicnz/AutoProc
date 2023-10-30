"use client";
//libs
import { PrinterOutlined } from "@ant-design/icons";
import { Button, Divider, Empty, Result, Segmented, Skeleton } from "antd";
import { CSSProperties, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
//components
import NetworkError from "@components/admin/network-error"; //Network Error
import SubHeader from "@components/admin/procurement/subheader"; //Sub Header
import Preview from "@components/admin/procurement/preview"; //Preview
import { usePRId } from "@/components/admin/pr-number"; //PR ID
import PreviewHeader from "@components/admin/procurement/previewheader"; //Preview Header
import SignatureBlock from "@/components/admin/signature-block"; //Signature Block
//Preview
import MakeFinal from "./final";
import DocumentType from "./picker";
import ContentPane from "./content";
import useSWR from "swr";
//configs
const WrapperStyles: CSSProperties = {
    display: "grid",
    gridTemplateRows: "56px 1fr",
    width: "100%",
    height: "calc(100vh - 112px)",
};
//
const PurchaseRecommendation = function () {
    const prId = usePRId();
    const [documentType, setDocumentType] = useState<"review" | "approve">(
        "review"
    );
    const printableComponent = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => printableComponent.current,
    });

    const { data, isLoading, error, isValidating } = useSWR(
        `/administrator/api/recommendation?_id=${prId}`
    );

    if (error) {
        return <NetworkError />;
    }
    if (isLoading || !data) {
        return <Skeleton active />;
    } else {
        if (data === null) {
            return (
                <Result
                    status={"info"}
                    icon={<Empty />}
                    title="No Document"
                    subTitle="Create New Request For Quotation Document"
                />
            );
        } else {
            return (
                <>
                    <div style={WrapperStyles}>
                        <SubHeader leading={<MakeFinal final={data.final} id={data.id} prFinal={data.prFinal} />}>
                            <DocumentType onChange={(e: any) => setDocumentType(e)} />
                            <Divider type="vertical" />
                            <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                                Print
                            </Button>
                        </SubHeader>

                        <Preview ref={printableComponent}>
                            <PreviewHeader height={150}>
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
                                        Approval of BAC Resolution Recommending Alternative Mode of
                                        Procurement under Small Value Procurement
                                    </div>
                                </div>
                            </PreviewHeader>
                            <div>
                                {/*Empty Block Accomodate for the Layout of this Preview having Four Children*/}
                            </div>
                            <ContentPane approval={documentType === "approve"} data={data} />
                            <div style={{ padding: "5px 25px" }}>
                                <SignatureBlock
                                    enduser={{ name: data.enduser, department: data.department }}
                                    approval={documentType === "approve"}
                                />
                            </div>
                        </Preview>
                    </div>
                </>
            );
        }
    }
};

export default PurchaseRecommendation;
