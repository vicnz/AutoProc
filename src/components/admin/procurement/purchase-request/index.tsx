"use client";
//libs
import { PrinterOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useSWR from "swr";
import { notFound } from "next/navigation";
//components
import { usePRId } from "@components/admin/procurement/purchase-id-context"; //Shared PRIDProvider
import NetworkError from "@components/network-error"; //Network Error Message
import SubHeader from "@components/admin/layouts/procurement-item/header/sub"; //Subheader
import Preview from "@components/admin/layouts/procurement-item/preview-wrapper"; //Preview Wrapper
import Edit from "@components/admin/features/purchase-crud"; //EDIT Purchase Request Item
import PreviewHeader from "@components/admin/layouts/procurement-item/preview-wrapper/header"; //Preview Shared Header
import Approval from "@components/admin/procurement/purchase-signatures"; //Approva Block
//specific
import ParticularsBlock from "./particulars";
import DetailsBlock from "./details"; //Section 'DETAILS' Block
import Final from "./final";
//styles
import { WrapperStyles } from "./styles";
//
const PurchaseRequest = function () {
    const prId = usePRId(); //PR ID
    //* PRINTING
    const printableComponent = useRef(null); //PRINTABLE COMPONENTS
    const handlePrint = useReactToPrint({
        content: () => printableComponent.current,
    });
    //* PRINTING

    //*FETCH PR DATA
    const { data, isLoading, error, isValidating } = useSWR(
        `/administrator/api/procurement/pr?_id=${encodeURIComponent(prId)}`
    );

    //FAILED TO LOAD DATA
    if (error) {
        return (
            <>
                <NetworkError />
            </>
        );
    }
    //DATA IS LOADING
    if (isLoading || !data) {
        return (
            <>
                <Skeleton active />
            </>
        );
    } else {
        if (data.empty) {
            notFound();
        }
        //RENDER DATA
        return (
            <>
                <div style={WrapperStyles}>
                    {/* SUBHEADER */}
                    <SubHeader leading={<Final final={data.final} id={data.id} />}>
                        <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                            Print
                        </Button>
                        <Edit type="edit" prId={prId} final={data.final} /> {/* EDIT PR */}
                    </SubHeader>
                    {/* SUBHEADER */}
                    <Preview ref={printableComponent}>
                        <PreviewHeader>
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: "1.3em",
                                    fontWeight: "bold",
                                }}
                            >
                                PURCHASE REQUEST
                            </p>
                        </PreviewHeader>
                        <DetailsBlock
                            data={{
                                date: data.date,
                                department: data.department,
                                number: data.number,
                                reference: data.reference,
                                obr: data.obr,
                                sai: data.sai,
                                section: data.section,
                            }}
                        />
                        {/* PR INFORMATION BLOCK */}
                        <ParticularsBlock data={data.particulars} />
                        <div style={{ padding: "5px 25px" }}>
                            <Approval approval={true} enduser={{ name: data.enduser, department: data.department }} />
                        </div>
                    </Preview>
                </div>
            </>
        );
    }
};

export default PurchaseRequest;
