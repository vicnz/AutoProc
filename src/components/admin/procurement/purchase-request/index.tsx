"use client";
//libs
import { PrinterOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import { CSSProperties, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useSWR from "swr";
//components
import { usePRId } from "@/components/admin/pr-number"; //Shared PRIDProvider
import NetworkError from "@components/admin/network-error"; //Network Error Message
import SubHeader from "@components/admin/procurement/subheader"; //Subheader
import Preview from "@components/admin/procurement/preview"; //Preview Wrapper
import Edit from "@components/admin/features/purchase-crud"; //EDIT Purchase Request Item
import PreviewHeader from "@/components/admin/procurement/previewheader"; //Preview Shared Header
import Approval from "@/components/admin/signature-block"; //Approva Block
//specific
import ParticularsBlock from './particulars'
import DetailsBlock from "./details"; //Section 'DETAILS' Block
import Final from './final'
//configs
const WrapperStyles: CSSProperties = {
    display: "grid",
    gridTemplateRows: "56px 1fr",
    width: "100%",
    height: "calc(100vh - 112px)",
};
//
const PurchaseRequest = function () {
    const prId = usePRId(); //PR ID
    const printableComponent = useRef(null); //PRINTABLE COMPONENTS
    const handlePrint = useReactToPrint({
        content: () => printableComponent.current,
    });

    //FETCH PR DATA
    const { data, isLoading, error, isValidating } = useSWR(
        `/administrator/api/pr?_id=${prId}`
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
                        <DetailsBlock data={{ date: data.date, department: data.department, number: data.number, reference: data.reference, obr: data.obr, sai: data.sai, section: data.section }} />{/* PR INFORMATION BLOCK */}
                        <ParticularsBlock data={data.particulars} />
                        <div style={{ padding: "5px 25px" }}>
                            <Approval
                                approval={true}
                                enduser={{ name: data.enduser, department: data.department }}
                            />
                        </div>
                    </Preview>
                </div>
            </>
        );
    }
};

export default PurchaseRequest;
