"use client";

import { App, Button, Divider, Form, Input } from "antd";
import { PrismaModels } from "@lib/db";
//componens
//actions
import { updateSupplier } from "@state/suppliers/actions";
import { SaveOutlined } from "@ant-design/icons";
import { useState } from "react";

type SupplierDataType = Partial<PrismaModels["suppliers"]>;

function FormSupplier(props: { data: SupplierDataType; edit?: boolean }) {
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    let isEdit = true;
    const onFinish = async () => {
        setLoading(true);
        const formData = form.getFieldsValue();
        const response = await updateSupplier(JSON.stringify(formData));

        if (response?.error) {
            message.error("Server Errro Occured");
            setLoading(false);
        }
        //return back to supplier list
    };
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
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="Address" name="address">
                <Input />
            </Form.Item>
            <Divider>Representative</Divider>
            <Form.Item label="Representative" name="representative">
                <Input />
            </Form.Item>
            <Form.Item label="Position" name="position">
                <Input />
            </Form.Item>
            <Button icon={<SaveOutlined />} type="primary" loading={loading} htmlType="submit" block>
                Update Supplier
            </Button>
        </Form>
    );
}

export default FormSupplier;
