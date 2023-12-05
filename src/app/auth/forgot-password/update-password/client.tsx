"use client";

import { Flex, Alert, Button, App, Form, Input, Popconfirm } from "antd";
import { useState } from "react";
import { objectToForm } from "@lib/converters/formData";
import { updatePassword } from "./action";
import { useRouter } from "next/navigation";

function ForgotPassword(props: { userid: string; token: string }) {
    const { replace, refresh } = useRouter();
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onSubmit = async () => {
        setLoading(true);
        const formData = objectToForm({
            userId: props.userid,
            password: form.getFieldValue("password"),
            token: props.token,
        });

        const response = await updatePassword(formData);

        if (response.error) {
            setLoading(false);
            message.error("Server Error");
            refresh();
        } else {
            setTimeout(() => {
                replace("/auth/signin");
            }, 1000);
        }
    };

    return (
        <>
            <br />
            <Alert
                message="Time-Limited Session"
                type="error"
                description="Update password page will only last for about 5 minute before terminating the session."
            />
            <br />
            <Form form={form} onFinish={() => null}>
                <Flex vertical>
                    <Form.Item
                        name="password"
                        rules={[{ required: true }, { min: 5, message: "Minimum Of 5 Characters" }]}
                    >
                        <Input.Password placeholder="New Password" size="large" />
                    </Form.Item>
                    <Form.Item
                        name="confirm_password"
                        rules={[
                            {
                                required: true,
                                message: "Password Confirmation Required",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("The new password that you entered do not match!"));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm Password" size="large" />
                    </Form.Item>
                    <Popconfirm title={"Confirm Password Change"} onConfirm={onSubmit} onCancel={() => {}}>
                        <Button size="large" type="primary" htmlType="submit" loading={loading}>
                            Update Password
                        </Button>
                    </Popconfirm>
                </Flex>
            </Form>
        </>
    );
}

export default ForgotPassword;
