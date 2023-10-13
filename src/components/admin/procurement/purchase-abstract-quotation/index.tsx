"use client";
//libs
import { PrinterOutlined } from "@ant-design/icons";
import { Button, Skeleton, theme } from "antd";
import { CSSProperties, useRef } from "react";
import useSWR from "swr";
import { useReactToPrint } from "react-to-print";
//components
import { usePRId } from "@components/admin/PRId";
import NetworkError from "@components/admin/network-error";
import Preview from "@components/admin/procurement/preview";
import PreviewHeader from "@components/admin/procurement/previewheader";
import SubHeader from "@components/admin/procurement/subheader";
import Approval from "@components/admin/signature-block";
import EditAbstractQuotation from "@/components/admin/features/purchase-abstract-crud";
//local
import CreateNewAbstract from "./create-new";
import RequireFinal from "./requirefinal";
import MakeFinal from "./final";
import TopSection from "./top";
import Abstracts from "./content";
//configs
const WrapperStyles: CSSProperties = {
    display: "grid",
    gridTemplateRows: "56px 1fr",
    width: "100%",
    height: "calc(100vh - 112px)",
};
//
const AbstractOfQuotation = function () {
    const prId = usePRId(); //PR ID
    const printableComponent = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => printableComponent.current,
    });
    //FETCH DATA
    const { data, isLoading, error } = useSWR(
        `/administrator/api/abstract?_id=${prId}`
    );

    //ERROR
    if (error) {
        return (
            <NetworkError
                title="Failed To Load Abstract Quotation"
                subTitle="Please Reload Page or Try Again Later"
            />
        );
    }

    //PENDING DATA
    if (isLoading || !data) {
        return <Skeleton active />;
    }

    //REQUIRING FOLLOWING DOCUMENT TO BE FINAL
    if (data.requiredFinal === true) {
        return (
            <RequireFinal
                title="Required Purchase Request and Price Quotation"
                subTitle="Purchase Request and Price Quotation required to be final first"
            />
        );
    } else {
        if (data.empty === true) {
            //IF DATA IS EMPTY THEN RESPOND WITH "CREATE NEW"
            return <CreateNewAbstract />;
        } else {
            return (
                <div style={WrapperStyles}>
                    <SubHeader
                        leading={
                            <MakeFinal
                                final={data.final}
                                id={data.id}
                                rfqFinal={data.rfqFinal}
                            />
                        }
                    >
                        <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                            Print
                        </Button>
                        <EditAbstractQuotation data={data} />
                    </SubHeader>
                    {/* PRINTABLE SECTION */}
                    <Preview ref={printableComponent}>
                        <PreviewHeader>
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: "1.3em",
                                    fontWeight: "bold",
                                }}
                            >
                                ABSTRACT OF QUOTATION
                            </p>
                        </PreviewHeader>
                        <TopSection data={data} />
                        <Abstracts
                            quotations={data.quotations}
                            suppliers={data.suppliers}
                            bidder={{
                                supplier: data.lowestBidder,
                                amount: data.lowestAmount,
                            }}
                        />
                        <div style={{ padding: "5px 25px" }}>
                            <Approval approval={false} enduser={data.enduser} />
                        </div>
                    </Preview>
                </div>
            );
        }
    }
};

export default AbstractOfQuotation;
