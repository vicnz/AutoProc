"use client";
//libs
import { PrinterOutlined } from "@ant-design/icons";
import { App, Button, Divider, Empty, Result, Skeleton, Spin } from "antd";
//Properties
import { CSSProperties, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import dynamic from "next/dynamic";
import useSWR from "swr";
//components
import NetworkError from "@components/admin/network-error";
import SubHeader from "@components/admin/layouts/procurement-item/header/sub";
import EditPriceQuotation from "@components/admin/features/price-quotation-crud";
import Preview from "@components/admin/layouts/procurement-item/preview-wrapper";
import { usePRId } from "@components/admin/procurement/purchase-id-context";
//Preview
import DocumentType from "./picker";
import SelectedSupplier from "./select-supplier";
import MakeFinal from "./final";
//configs
//Views
const QuotationView = dynamic(
    async () => await import("@components/admin/procurement/purchase-price-quotation/quotation-view"),
    {
        loading: () => (
            <div style={{ padding: 25 }}>
                <Spin spinning />
            </div>
        ),
    }
);
const ReceiptView = dynamic(
    async () => await import("@components/admin/procurement/purchase-price-quotation/receipt-view"),
    {
        loading: () => (
            <div style={{ padding: 25 }}>
                <Spin spinning />
            </div>
        ),
    }
);
//styles
const WrapperStyles: CSSProperties = {
    display: "grid",
    gridTemplateRows: "56px 1fr",
    width: "100%",
    height: "calc(100vh - 112px)",
};
//
const PurchaseRecommendation = function () {
    const prId = usePRId(); //PR ID
    const { message } = App.useApp();
    const [documentType, setDocumentType] = useState<"quotation" | "receipt">("quotation");
    const [selectedSupplier, setSelectedSupplier] = useState(""); //Selected Supplier
    //Handle Print
    const printableComponent = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => printableComponent.current,
    });

    //FETCH Resource
    const { data, isLoading, error, isValidating } = useSWR(
        `/administrator/api/procurement/rfq?_id=${encodeURIComponent(prId)}`
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
                        <SubHeader
                            leading={<MakeFinal final={data.final} id={data.id} recommendFinal={data.recommendFinal} />}
                        >
                            {documentType === "quotation" ? (
                                <SelectedSupplier
                                    activeSupplier={selectedSupplier}
                                    setSupplier={setSelectedSupplier}
                                    handlePrint={() => {
                                        if (selectedSupplier === "") {
                                            message.warning("Please Select A Supplier");
                                        } else {
                                            handlePrint();
                                        }
                                    }}
                                    data={data.suppliers}
                                />
                            ) : (
                                <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                                    Print
                                </Button>
                            )}
                            <Divider type="vertical" />
                            <DocumentType onChange={(e: any) => setDocumentType(e)} />
                            <EditPriceQuotation data={data} />
                        </SubHeader>

                        <Preview ref={printableComponent}>
                            {documentType === "quotation" ? (
                                <QuotationView data={data} supplier={selectedSupplier} />
                            ) : (
                                <ReceiptView data={data} />
                            )}
                        </Preview>
                    </div>
                </>
            );
        }
    }
};

export default PurchaseRecommendation;
