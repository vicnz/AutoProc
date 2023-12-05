"use client";

import { Flex, Alert, Button, App, Form, Input } from "antd";
import { useState } from "react";
import { fetchUserID } from "./action";
import { objectToForm } from "@lib/converters/formData";
import { useRouter } from "next/navigation";

function ForgotPassword() {
    const { message } = App.useApp();
    const { back, replace } = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);
        const data = objectToForm(form.getFieldsValue());
        const response = await fetchUserID(data);
        if (response.error) {
            setLoading(false);
            message.error(`Error Occured: ${response.message}`);
        } else {
            replace(`/auth/forgot-password/${encodeURIComponent(response.id as string)}`);
            setLoading(false);
        }
    };

    return (
        <>
            <br />
            <Alert
                type="warning"
                description="This feature is highly under security testing to prevent unwanted behaviors."
            />
            <br />
            <Form form={form} onFinish={onSubmit}>
                <Flex vertical gap={10}>
                    <Form.Item name="username" noStyle rules={[{ required: true }]}>
                        <Input placeholder="Enter Your Username" size="large" />
                    </Form.Item>
                    <Form.Item name="email" noStyle rules={[{ required: true }]}>
                        <Input inputMode="email" placeholder="Enter Your Email" size="large" />
                    </Form.Item>
                </Flex>
                <br />
                <Flex justify="end" gap={5}>
                    <Button size="large" onClick={() => back()}>
                        Cancel
                    </Button>
                    <Button type="primary" size="large" htmlType="submit" loading={loading}>
                        Proceed
                    </Button>
                </Flex>
            </Form>
        </>
    );
}

export default ForgotPassword;
