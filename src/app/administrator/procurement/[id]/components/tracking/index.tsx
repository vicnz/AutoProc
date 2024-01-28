"use client";

/**
 * * - CODE GENERATOR FEATURE
 * * - Generate QR Code for tracking document
 * * - Used by the AutoProc Tracking App™️
 */
import { PrinterOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Button, Modal, Skeleton, Divider } from "antd";
import { memo, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
//components
import CodeGenerator from "./code";
import AlternativeRender from "./alt-monitoring";
import { useRecordId } from '../pr-id-provider';
//configs
//actions
import { generateTracking } from './server';

//TODO prevent re-generation of QR Code
const PrintQRCode = function (props: { id: string }) {
    const [generateCode, setGeneratedCode] = useState<{ token: string, payload: { number: string | null, reference: string, id: string } } | undefined>(undefined)
    const qrPrintRef = useRef(null);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        (async function fetchInfo() {
            const result = await generateTracking({ id: props.id })
            if (result.token) {
                setGeneratedCode(result)
            }
        })()
    }, [props.id])

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
                        {(typeof generateCode !== 'undefined') ?
                            (
                                <>
                                    <div style={{ padding: 15 }} ref={qrPrintRef}>
                                        <CodeGenerator code={generateCode.token} number={generateCode.payload.number as string} />
                                        <Divider>OR ALTERNATIVELY</Divider>
                                        <AlternativeRender />
                                    </div>
                                </>
                            ) :
                            (
                                <>
                                    <Skeleton active />
                                </>
                            )
                        }
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default memo(PrintQRCode);
