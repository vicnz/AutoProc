"use client";

import { SaveOutlined } from "@ant-design/icons";
import { App, Button, Divider, Form, Input } from "antd";
import { PrismaModels } from "@lib/db";
import { useState } from "react";
//actions
import { addNewSupplier } from "@state/suppliers/actions";
//

type SupplierDataType = Partial<PrismaModels["suppliers"]>;

function FormSupplier(props: { data: SupplierDataType; edit?: boolean; close?: () => void }) {
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    //save
    const onFinish = async () => {
        setLoading(true);
        const data = form.getFieldsValue();
        const actions = await addNewSupplier(JSON.stringify(data));
        if (actions?.error) {
            message.error("An Error Occured Please Try Again");
            setLoading(false);
        } else {
            message.success("Added New Supplier 👍🏻");
            setLoading(false);
            props?.close && props.close();
        }
    };
    //
    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{ ...props.data }}
            method="PUT"
            onFinish={onFinish}
            preserve={false}
        >
            <Form.Item name="id" hidden>
                <Input />
            </Form.Item>
            <Form.Item label="TIN" name="tin" rules={[{ required: true, message: "TIN Number is Required" }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Supplier Name Required" }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{ required: true, message: "Address Required" }]}>
                <Input />
            </Form.Item>
            <Divider>Representative</Divider>
            <Form.Item
                label="Representative"
                name="representative"
                rules={[{ required: true, message: "Required Representative" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Position"
                name="position"
                rules={[{ required: true, message: "Required Representative Position" }]}
            >
                <Input />
            </Form.Item>
            <Button icon={<SaveOutlined />} type="primary" loading={loading} htmlType="submit" block>
                Save Supplier
            </Button>
        </Form>
    );
}

export default FormSupplier;
