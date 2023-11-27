"use client";

import { App, Button, Divider, Form, Input } from "antd";
import { PrismaModels } from "@lib/db";
import { updateSupplier } from "./action";
import { SaveOutlined } from "@ant-design/icons";
import { useState } from "react";
import { objectToForm } from "@lib/converters/formData";

type SupplierDataType = Partial<PrismaModels["suppliers"]>;

function FormSupplier(props: { data: SupplierDataType }) {
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async () => {
        setLoading(true);
        const data = objectToForm(form.getFieldsValue());
        const response = await updateSupplier(data);

        if (response?.error) {
            message.error(`An Error Occured ${response.message}`);
            setLoading(false);
        } else {
            message.success(`Updated Supplier`);
            setLoading(false);
        }
    };
    return (
        <Form form={form} layout="vertical" initialValues={{ ...props.data }} onFinish={onFinish} preserve={false}>
            <Form.Item name="id" hidden>
                <Input />
            </Form.Item>
            <Form.Item
                label="TIN"
                name="tin"
                rules={[
                    { required: true, message: "TIN Number is Required" },
                    { pattern: /^\d{3}-\d{3}-\d{3}-\d{3}$/, message: "Invalid Tin No. Format" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Divider>Representative</Divider>
            <Form.Item label="Representative" name="representative" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Position" name="position" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Divider />
            <Button icon={<SaveOutlined />} type="primary" loading={loading} htmlType="submit" block>
                Update Supplier
            </Button>
        </Form>
    );
}

export default FormSupplier;
