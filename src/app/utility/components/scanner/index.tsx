"use client";

import { Alert, Button, Modal, Space } from "antd";
import { useEffect, useState } from "react";

import Scanner from "./scanner";
import { CheckCircleOutlined, ClockCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

type ScannerModalProps = {
    onSubmit?: (param: { token: string; timestamp: Object }) => any;
    open: boolean;
    setOpen: (value: boolean) => any;
};

function ScannerModal(props: ScannerModalProps) {
    const currentTimestamp = dayjs();
    const [tokenString, setTokenString] = useState(undefined);
    let timer: any; //TODO convert timer to useRef()
    const onSubmit = async () => {
        if (tokenString) {
            props.onSubmit &&
                props.onSubmit({ token: tokenString, timestamp: currentTimestamp.format("MMMM DD, hh:mm A") });
        }
    };

    const onScannerResult = (result: any) => {
        if (result) {
            setTokenString(result?.text);
        }
    };

    useEffect(() => {
        //Close Scanner After 5 Seconds If There Is No Scanner Result
        timer = setTimeout(() => {
            setTokenString(undefined);
            props.setOpen(false);
        }, 15000);

        return () => {
            clearTimeout(timer);
        };
    }, [props.open]);

    return (
        <Modal
            destroyOnClose
            open={props.open}
            onCancel={() => {
                props.setOpen(false);
                setTokenString(undefined);
                clearTimeout(timer);
            }}
            cancelButtonProps={{
                size: "large",
            }}
            title={"Scanning Code"}
            centered
            closeIcon={null}
            footer={
                <Space>
                    <Button style={{ pointerEvents: "none" }} size="large" icon={<ClockCircleOutlined />} type="text">
                        {currentTimestamp.format("MMMM DD, hh:mm A")}
                    </Button>
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
                <Scanner onError={() => {}} onScan={onScannerResult} style={{ width: "100%", borderRadius: 8 }} />
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
