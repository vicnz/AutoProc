"use client";

import { QrcodeOutlined } from "@ant-design/icons";
import { App, Button, Cascader, CascaderProps, Flex } from "antd";
import { useState } from "react";
import ScannerModal from "../scanner";
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
    const [value, setValue] = useState<any>();
    const [show, setShow] = useState(false);

    const onSubmit = async () => {
        if (!value) {
            message.open({ type: "warning", content: "Please Select An Office Destination..." });
        } else {
            setShow(true);
        }
    };

    const onResultOk = async (e: { token: string; timestamp: Object }) => {
        const selectedOffice = (value as any[]).pop();
        const timeStamp = dayjs(e.timestamp as Dayjs).toISOString();
        const uri = `/utility/view/${e.token}?officeId=${selectedOffice}&timestamp=${timeStamp}`;
        push(uri); //goto page
    };

    return (
        <Flex style={{ width: "100%", padding: "0 25px" }} vertical align="center" gap={5}>
            <Cascader
                style={{ width: "100%" }}
                options={props.data}
                onChange={(e) => setValue(e)}
                value={value}
                size="large"
            />
            <Button type="primary" icon={<QrcodeOutlined />} block size="large" onClick={onSubmit}>
                Scan QR
            </Button>
            <ScannerModal open={show} setOpen={setShow} onSubmit={onResultOk} />
        </Flex>
    );
}

export default PRScanner;
