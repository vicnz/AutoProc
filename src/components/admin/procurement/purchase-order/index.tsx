"use client";
//libs
import { PrinterOutlined } from "@ant-design/icons";
import { Button, Descriptions, Skeleton, theme } from "antd";
import { CSSProperties, useRef } from "react";
import useSWR from "swr";
import { useReactToPrint } from "react-to-print";
//components
//
import { usePRId } from "@components/admin/PRId";
import NetworkError from "@components/admin/network-error";
import CreateNewPO from "./createnew";
import Preview from "@components/admin/procurement/preview";
import PreviewHeader from "@components/admin/procurement/previewheader";
import SubHeader from "@components/admin/procurement/subheader";
import EditPO from "@components/admin/features/purchase-order-crud";
import TopSection from "./top";
import Content from "./particulars";
import RequireFinal from "./requirefinal";
import BottomSection from "./bottom";
import MakeFinal from "./final";

//configs
const { useToken } = theme;
const WrapperStyles: CSSProperties = {
    display: "grid",
    gridTemplateRows: "56px 1fr",
    width: "100%",
    height: "calc(100vh - 112px)",
};
//
const PurchaseOrder = function () {
    const prId = usePRId();
    console.log('localized', prId)
    const { token } = theme.useToken();

    const printableComponent = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => printableComponent.current,
    });

    const { data, isLoading, error } = useSWR(
        `/administrator/api/po?_id=${prId}`
    );

    if (error) {
        return (
            <NetworkError
                title="Failed To Load Purchase Order"
                subTitle="Please Reload Page or Try Again Later"
            />
        );
    }
    if (isLoading || !data) {
        return <Skeleton active />;
    } else {
        if (data.requiredFinal === true) {
            return (
                <RequireFinal
                    title="Required Abstract of Quotation to be Final"
                    subTitle="Abstract of Quotation required to be final first"
                />
            );
        }
        if (data.empty === true) {
            return <CreateNewPO prID={prId} />;
        } else {
            return (
                <>
                    <div style={WrapperStyles}>
                        <SubHeader
                            leading={
                                <MakeFinal
                                    awardsFinal={data.awardsFinal}
                                    final={data.final}
                                    id={data.id}
                                />
                            }
                        >
                            <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                                Print
                            </Button>
                            <EditPO type="edit" prId={prId} final={data.final} />
                        </SubHeader>
                        <Preview ref={printableComponent}>
                            <PreviewHeader>
                                <p
                                    style={{
                                        textAlign: "center",
                                        fontSize: "1.3em",
                                        fontWeight: "bold",
                                    }}
                                >
                                    PURCHASE ORDER
                                </p>
                            </PreviewHeader>
                            <TopSection data={data} />
                            <Content data={data} />
                            <BottomSection
                                particulars={data.particulars}
                                reference={data.reference}
                            />
                        </Preview>
                    </div>
                </>
            );
        }
    }
};

export default PurchaseOrder;
