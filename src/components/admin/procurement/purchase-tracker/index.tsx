"use client";

/**
 * * - CODE GENERATOR FEATURE
 * * - Generate QR Code for tracking document
 * * - Used by the AutoProc Tracking App™️
 */
import { PrinterOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Button, Modal, Result, Skeleton, Divider } from "antd";
import { memo, useRef, useState } from "react";
import useSWR from "swr";
import { useReactToPrint } from "react-to-print";
//components
import CodeGenerator from "./code";
import AlternativeRender from "./alt-monitoring";
import { usePRId } from "@components/admin/procurement/purchase-id-context";
//configs

//TODO prevent re-generation of QR Code
const PrintQRCode = function () {
    const id = usePRId();
    const qrPrintRef = useRef(null);
    const [open, setOpen] = useState(false);

    const { data, isLoading, error } = useSWR<{ token: string; payload: any }>(
        `/administrator/api/procurement/qrcode?_id=${encodeURIComponent(id)}`,
        { revalidateIfStale: false }
    );

    const handlePrint = useReactToPrint({
        content: () => qrPrintRef.current,
    });

    return (
        <>
            <Button type="text" icon={<QrcodeOutlined />} onClick={() => setOpen(true)}>
                Tracking
            </Button>
            <Modal
                destroyOnClose
                open={open}
                onCancel={() => setOpen(false)}
                onOk={() => setOpen(false)}
                centered
                title="PRINT TRACKING"
                footer={
                    <>
                        <Button icon={<PrinterOutlined />} type="primary" block onClick={handlePrint}>
                            Print Tracking Attachment
                        </Button>
                    </>
                }
                width={700}
            >
                <div
                    style={{
                        height: "50vh",
                        width: "100%",
                        position: "relative",
                        overflowY: "auto",
                    }}
                >
                    <div
                        style={{
                            height: "auto",
                            width: "inherit",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                    >
                        {error ? (
                            <Result status={"500"} title="Unable To Fetch ID" subTitle="Please Try Again" />
                        ) : !data || isLoading ? (
                            <Skeleton active />
                        ) : (
                            <div style={{ padding: 15 }} ref={qrPrintRef}>
                                <CodeGenerator code={data.token} number={data.payload.number} />
                                <Divider>OR ALTERNATIVELY</Divider>
                                <AlternativeRender />
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default memo(PrintQRCode);
