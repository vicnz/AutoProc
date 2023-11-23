"use client";

import { Alert, Button, Modal, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Scanner from "./scanner";

type ScannerModalProps = {
    onSubmit?: (param: { token: string; timestamp: Object }) => any;
    open: boolean;
    setOpen: (value: boolean) => any;
};

/**
 *
 */
function ScannerModal(props: Readonly<ScannerModalProps>) {
    const { open, setOpen, onSubmit: onOk } = props;

    const currentTimestamp = dayjs(); //get current timestamp
    const [tokenString, setTokenString] = useState(undefined); //set decoded string from QR SCANNER API
    const timer = useRef<any>(null); //timer

    const onSubmit = async () => {
        //is token String is not
        if (typeof tokenString !== "undefined") {
            onOk &&
                onOk({
                    token: tokenString,
                    timestamp: currentTimestamp.format("MMMM DD, hh:mm A"),
                });
        }
    };

    const onScannerResult = (result: any) => {
        if (result) {
            setTokenString(result?.text);
        }
    };

    useEffect(() => {
        //Close Scanner After 15 Seconds If There Are No Scanner Result
        timer.current = setTimeout(() => {
            setTokenString(undefined);
            setOpen(false);
        }, 15000);

        return () => {
            clearTimeout(timer.current);
        };
    }, [props.open, setOpen, onOk]);

    return (
        <Modal
            destroyOnClose
            open={open}
            title={"Scanning Code"}
            centered
            closeIcon={null}
            cancelButtonProps={{
                size: "large",
            }}
            onCancel={() => {
                setOpen(false);
                setTokenString(undefined);
                clearTimeout(timer.current);
            }}
            footer={
                <Space>
                    <Button
                        icon={<CheckCircleOutlined />}
                        onClick={onSubmit}
                        disabled={!tokenString}
                        size="large"
                        type="primary"
                    >
                        Add Tracking
                    </Button>
                </Space>
            }
        >
            <div style={{ position: "relative", height: "auto", width: "100%" }}>
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        height: 300,
                        display: "grid",
                        placeItems: "center",
                        width: "100%",
                    }}
                >
                    {tokenString ? <CheckCircleOutlined style={{ color: "white", fontSize: "4em" }} /> : null}
                </div>
                {/* SCANNER COMPONENT */}
                <Scanner onError={() => {}} onScan={onScannerResult} style={{ width: "100%", borderRadius: 8 }} />
                {/* SCANNER COMPONENT */}
            </div>
            <br />
            <Alert
                type="info"
                icon={<InfoCircleOutlined />}
                message="Close Camera"
                description="Modal will Close after 15 Seconds of Inactivity or if there are NO Detected QR Code"
            />
        </Modal>
    );
}

export default ScannerModal;
