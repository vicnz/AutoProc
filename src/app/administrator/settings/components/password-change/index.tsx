"use client";

import { Button, Alert, Form, App, Input, Flex, Space, Divider } from "antd";
import { useState } from "react";
import { useConfirm } from "@components/password-confirm";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { updatePassword } from "./action";
import { objectToForm } from "@lib/converters/formData";

function PasswordReset(props: { account: any }) {
    const { id } = props.account; //get Account ID
    const { replace, refresh } = useRouter();
    const { modal, message } = App.useApp();
    const [valid, setValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [beforeExit, setBeforeExit] = useState(false);
    const [form] = Form.useForm();

    const onConfirmed = async (value: boolean) => {
        // Confirm Password
        setValid(value);
    };

    const { Component, trigger } = useConfirm(id, "/administrator/api/utils/confirm-password", onConfirmed);

    const onSubmit = async () => {
        setLoading(true);
        const data = objectToForm({ password: form.getFieldValue("password"), id });
        const response = await updatePassword(data);

        if (response?.error) {
            message.error("An Error Occured");
            setLoading(false);
        } else {
            //
            setLoading(false);

            modal.confirm({
                centered: true,
                title: "Sign In Again",
                content: "This Action Requires You To Sign In Again",
                okText: "Sign In",
                maskClosable: false,
                closeIcon: null,
                footer: (
                    <Button
                        block
                        onClick={async () => {
                            setBeforeExit(true);
                            //@ BUGGY CODE
                            await signOut({ redirect: false }).then((res) => {
                                //REDIRECT TO ROOT //@DEGUB - Without Using the NEXTAUTH_URL
                                refresh();
                                replace("/");
                            });
                            //@BUGGER CODE
                        }}
                        type="primary"
                        loading={beforeExit}
                    >
                        Sign In
                    </Button>
                ),
            });
        }
    };
    return (
        <>
            {Component}
            <Form form={form} initialValues={{ id }} layout="inline" onFinish={onSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 10 }}>
                    <strong>Update Password</strong>
                    <Flex vertical gap={10}>
                        <Button danger type="dashed" onClick={() => trigger()} disabled={valid} icon={<EditOutlined />}>
                            Change
                        </Button>
                        {valid ? (
                            <>
                                <Divider />
                                Enter Your Password
                                <Form.Item name="id" hidden>
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true }, { min: 5, message: "Minimum Of 5 Characters" }]}
                                >
                                    <Input.Password placeholder="New Password" />
                                </Form.Item>
                                <Form.Item
                                    name="confirm-password"
                                    dependencies={["password"]}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("password") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error("The new password that you entered do not match!")
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder="Confirm New Password" />
                                </Form.Item>
                                <Space style={{ width: "100%" }}>
                                    <Button
                                        htmlType="submit"
                                        icon={<SaveOutlined />}
                                        type="primary"
                                        block
                                        loading={loading}
                                    >
                                        Change Password
                                    </Button>
                                    <Button
                                        icon={<SaveOutlined />}
                                        onClick={() => {
                                            setValid(false);
                                            form.resetFields();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Space>
                            </>
                        ) : null}
                        <Alert
                            type="warning"
                            message="Sign In Again"
                            description="You Are Required To Sign In Again After Resetting Password"
                        />
                    </Flex>
                </div>
            </Form>
        </>
    );
}

export default PasswordReset;
