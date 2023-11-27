"use client";

import { SaveOutlined } from "@ant-design/icons";
import { App, Button, Divider, Form, Input } from "antd";
import { PrismaModels } from "@lib/db";
import { useState } from "react";
import { addNewSupplier } from "./actions";
import { objectToForm } from "@lib/converters/formData";

function AddSupplier() {
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    //save
    const onFinish = async () => {
        setLoading(true);

        const data = {
            ...form.getFieldsValue(),
        };
        const formData = objectToForm(data);

        const action = await addNewSupplier(formData);
        if (action.error) {
            message.error(`Error Occured ${action?.message}`);
            setLoading(false);
        } else {
            message.success("Added New Supplier");
            setLoading(false);
        }
    };
    //
    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
            <Divider />
            <Button icon={<SaveOutlined />} type="primary" loading={loading} htmlType="submit" block>
                Save Supplier
            </Button>
        </Form>
    );
}

export default AddSupplier;
