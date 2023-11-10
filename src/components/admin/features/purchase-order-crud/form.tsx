"use client";

/**
 * * - PURCHASE ORDER CRUD
 * * - Create and Edit Purchase Order
 */

import { PlusCircleOutlined } from "@ant-design/icons";
import {
    Form,
    Space,
    Input,
    DatePicker,
    Divider,
    Button,
    FormInstance,
    App,
    InputNumber,
    Select,
    Skeleton,
} from "antd";
//
import { memo, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import { mutate } from "swr";
import dynamic from "next/dynamic";
//coomponents
const PreviewPR = dynamic(async () => await import("@components/admin/features/pr-mini-preview"), {
    loading: () => <Skeleton active />,
});
//types
interface PurchaseOrderFormProps {
    close: () => any;
    data?: any;
    isEdit: boolean;
    prID?: string;
}
//
const PurchaseOrderForm = function (props: PurchaseOrderFormProps) {
    const { prID } = props;
    //PRELOAD DATA
    const preload = useMemo(() => {
        if (props.isEdit == true) {
            return { ...props.data, date: dayjs(props.data.date) };
        } else {
            return { date: dayjs(), particulars: [], duration: 30, mode: "Small-Value" };
        }
    }, [props.isEdit, props.data]);

    const { message } = App.useApp();
    const formRef = useRef<FormInstance>(null);
    const [saving, setSaving] = useState(false);

    //SUBMIT DATA
    const onFinish = async () => {
        if (props.isEdit === true) {
            setSaving(true);
            let response = await fetch(`/administrator/api/procurement/po?_id=${encodeURIComponent(preload.id)}`, {
                method: "PUT",
                body: JSON.stringify({
                    ...formRef.current?.getFieldsValue(),
                    date: dayjs(formRef.current?.getFieldValue("date")).toISOString(),
                }),
                headers: [["Content-Type", "application/json"]],
            });
            if (response.ok) {
                setSaving(false);
                message.success("Saved Procurement Record", 5);
                props.close();
            } else {
                setSaving(false);
                message.error("Error, Please Try Again");
            }
        } else {
            //ADDING NEW PR
            setSaving(true);
            let response = await fetch(`/administrator/api/procurement/po?_id=${encodeURIComponent(prID as string)}`, {
                method: "POST",
                body: JSON.stringify({
                    ...formRef.current?.getFieldsValue(),
                    date: dayjs(formRef.current?.getFieldValue("date")).toISOString(),
                }),
                headers: [["Content-Type", "application/json"]],
            });

            if (response.ok) {
                setSaving(false);
                message.success("Saved Purchase Order Record", 5);
                props.close();
            } else {
                setSaving(false);
                message.error("Error, Please Try Again");
            }
        }

        mutate(`/administrator/api/procurement/po?_id=${encodeURIComponent(prID as string)}`); //reload data from server
    };

    return (
        <Form layout="vertical" ref={formRef} onFinish={onFinish} autoComplete="false" colon initialValues={preload}>
            <PreviewPR />
            <br />
            <Divider>CREATE NEW</Divider>
            <Space style={{ width: "100%" }}>
                <Form.Item label="Entity/Agency" name="entity" rules={[{ required: true }]}>
                    <Input allowClear />
                </Form.Item>
                <Form.Item label="Date" name="date" style={{ width: "100%" }} rules={[{ required: true }]}>
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
            </Space>
            <Form.Item label="Destination" name="destination" rules={[{ required: true }]}>
                <Input allowClear />
            </Form.Item>
            <Form.Item name="mode" hidden>
                <Input /> {/**REMOVE THIS IN DATABASE */}
            </Form.Item>
            <Form.Item label="Delivery" name="duration" style={{ width: "inherit" }} rules={[{ required: true }]}>
                <Select
                    options={[
                        { label: "30 Days", value: 30 },
                        { label: "60 Days", value: 60 },
                        { label: "90 Days", value: 90 },
                    ]}
                    style={{ width: "100%" }}
                />
            </Form.Item>
            <Form.Item label="Delivery Term" name="term" rules={[{ required: true }]}>
                <Select
                    options={[
                        { label: "FOB Destination", value: "FOB Destination" },
                        { label: "FOB Shipment Location", value: "FOB Shipment Location" },
                    ]}
                />
            </Form.Item>
            <Form.Item label="Payment Term" name="payment" rules={[{ required: true }]}>
                <Input allowClear />
            </Form.Item>
            <Divider />
            <Button block icon={<PlusCircleOutlined />} type="primary" htmlType="submit" size="large" loading={saving}>
                Save Purchase Request
            </Button>
        </Form>
    );
};

export default memo(PurchaseOrderForm);
