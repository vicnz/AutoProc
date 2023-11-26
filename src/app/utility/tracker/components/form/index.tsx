"use client";

import { QrcodeOutlined } from "@ant-design/icons";
import { App, Button, Cascader, CascaderProps, Flex } from "antd";
import { useState } from "react";
import ScannerModal from "@components/qr-scanner/modal";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";

interface Option {
    value: string;
    label: string | null;
    children?: Option[];
}

type PRScannerFormProps = {
    data: Option[];
} & CascaderProps;

function PRScanner(props: PRScannerFormProps) {
    const { push } = useRouter();
    const { message } = App.useApp();
    // ─────────────────────────────────────────────────────────────────────
    const [value, setValue] = useState<any>(); //set deciphered text string
    const [show, setShow] = useState(false);

    const onSubmit = async () => {
        // ─── On Button Clicked ───────────────────────────────────────
        if (!value) {
            message.open({ type: "warning", content: "Please Select An Office Destination..." });
        } else {
            setShow(true);
        }
    };

    const onResultOk = async (e: { token: string; timestamp: Object }) => {
        // ─── Submit Confirmation ─────────────────────────────────────
        const selectedOffice = (value as any[]).pop();
        const timeStamp = dayjs(e.timestamp as Dayjs).toISOString();
        const uri = `/utility/tracker/view/?token=${e.token}&office=${selectedOffice}&timestamp=${timeStamp}`;
        push(uri); //goto page
    };

    return (
        <Flex style={{ width: "100%", padding: "0px" }} vertical align="center" gap={10}>
            <Cascader
                style={{ width: "100%" }}
                options={props.data}
                onChange={(e) => setValue(e)}
                value={value}
                size="large"
                placeholder="Office Location"
            />
            <Button type="primary" icon={<QrcodeOutlined />} block size="large" onClick={onSubmit}>
                Scan QRCode
            </Button>
            <ScannerModal open={show} setOpen={setShow} onSubmit={onResultOk} />
        </Flex>
    );
}

export default PRScanner;
