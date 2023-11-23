"use client";

import { Card, Button, Alert, Form, App, Input, Flex, Space, Modal } from "antd";
import React, { useState } from "react";
import { useConfirm } from "@components/password-confirm";
import { LockOutlined, SaveOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

function PasswordReset(props: { account: any }) {
    const { replace, refresh } = useRouter();
    const { modal, message } = App.useApp();
    const { id } = props.account;
    const [valid, setValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [beforeExit, setBeforeExit] = useState(false);

    const onConfirmed = async (value: boolean) => {
        setValid(value);
    };

    const { Component, trigger } = useConfirm(id, onConfirmed);

    const onSubmit = async () => {
        setLoading(true);
        const data = form.getFieldsValue();
        console.log(data);
        const request = await fetch("/administrator/api/profile/change-password", {
            method: "POST",
            body: JSON.stringify({
                id: data.id,
                password: data.password,
            }),
        });

        const req = await request.json();
        if (req?.error) {
            message.open({ type: "error", content: "Password Change Failed..." });
            setLoading(false);
        } else {
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
            setLoading(false);
        }
    };

    //TODO Add Pasword Input Masker
    return (
        <>
            {Component}
            <Form form={form} initialValues={{ id }} layout="inline" onFinish={onSubmit}>
                <Card
                    title={
                        <>
                            <LockOutlined /> Password Change
                        </>
                    }
                >
                    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 10 }}>
                        <Button danger type="primary" onClick={() => trigger()} disabled={valid}>
                            Change
                        </Button>
                        <Flex vertical gap={10}>
                            {valid ? (
                                <>
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
                                    <br />
                                </>
                            ) : null}
                            <Alert
                                type="warning"
                                message="Sign In Again"
                                description="You Are Required To Sign In Again After Resetting Password"
                            />
                        </Flex>
                    </div>
                </Card>
            </Form>
        </>
    );
}

export default PasswordReset;
