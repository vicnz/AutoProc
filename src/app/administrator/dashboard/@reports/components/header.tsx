"use client";

import { PrinterOutlined, ProjectOutlined, ReloadOutlined } from "@ant-design/icons";
import { Divider, Flex, Select, DatePicker, Button, Form } from "antd";
import dayjs from "dayjs";

function ReportsHeader(props: { onSubmit: (data: [string, string]) => void; handlePrint: () => void }) {
    const [form] = Form.useForm();

    //
    const onFinish = async () => {
        const [start, end] = form.getFieldValue("date-range");
        props.onSubmit([dayjs(start).toISOString(), dayjs(end).toISOString()]);
    };
    //
    return (
        <>
            <span>
                <ProjectOutlined />
                {` `} GENERATE REPORT
            </span>
            <Flex gap={10} align="center">
                <Form layout="inline" onFinish={onFinish} form={form}>
                    <Form.Item rules={[{ required: true, message: "Date Range is Required" }]} name="date-range">
                        <DatePicker.RangePicker />
                    </Form.Item>
                    <Button htmlType="submit" type="primary" icon={<ReloadOutlined />}>
                        Re-Generate
                    </Button>
                </Form>
            </Flex>
            <Button icon={<PrinterOutlined />} onClick={props.handlePrint}>
                Print
            </Button>
        </>
    );
}

export default ReportsHeader;
