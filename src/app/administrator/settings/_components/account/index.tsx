"use client";

import { SaveOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Divider, Flex, Form, Input, Tooltip } from "antd";
import Avatar from "boring-avatars";
import { useConfirm } from "@components/password-confirm";
import { useState } from "react";
import { updateAdmin } from "../../_server/account.actions";

function AccountView(props: { account: any }) {
    const [form] = Form.useForm(); //FORM
    const [loading, setLoading] = useState(false); //SET LOADING

    const callback = async (value: boolean) => {
        //UPDATE FORM DATA
        if (value === true) {
            setLoading(true);
            const data = form.getFieldsValue();
            const fetch = await updateAdmin(JSON.stringify(data)); //SERVER ACTION
            if (fetch.error) {
                console.log("Failed To Update");
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
    };

    const { Component, trigger } = useConfirm(props.account.id, callback); //USE CONFIRM

    const onSubmit = async () => {
        //SHOW PASSWORD CONFIRM
        trigger();
    };
    return (
        <>
            {Component}
            <Form layout="vertical" initialValues={{ ...props.account }} form={form} onFinish={onSubmit}>
                <Card
                    title={
                        <span>
                            <UserOutlined /> Account
                        </span>
                    }
                    extra={
                        <>
                            <Button icon={<SaveOutlined />} type="primary" htmlType="submit" loading={loading}>
                                Save
                            </Button>
                        </>
                    }
                >
                    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr" }}>
                        <div style={{ textAlign: "center" }}>
                            <br />
                            <Avatar name={props.account.fullname} size={75} variant="beam" />
                        </div>
                        <div>
                            <Form.Item hidden name="id">
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="username"
                                noStyle
                                rules={[{ required: true }, { min: 3, max: 25, message: "Maximum 25 Characters" }]}
                            >
                                <Input addonBefore="Username" placeholder="Username" />
                            </Form.Item>
                            <br />
                            <br />
                            <Alert
                                type="warning"
                                message="Login Again"
                                description="You are Required to Login Again After Updating Username"
                            />
                            <br />
                            <Divider orientation="left">Personal Information</Divider>
                            <Flex gap={10} vertical>
                                <Form.Item
                                    name="fname"
                                    noStyle
                                    rules={[{ required: true, message: "First Name Must Not Be Blank" }]}
                                >
                                    <Input allowClear placeholder="First Name" />
                                </Form.Item>
                                <Form.Item name="mname" noStyle>
                                    <Input allowClear placeholder="Middle Name" />
                                </Form.Item>
                                <Form.Item
                                    name="lname"
                                    noStyle
                                    rules={[{ required: true, message: "Last Name Must Not Be Blank" }]}
                                >
                                    <Input allowClear placeholder="Last Name" />
                                </Form.Item>
                                <Form.Item name="suffix" noStyle>
                                    <Input allowClear placeholder="Suffix" />
                                </Form.Item>
                                <Divider orientation="left">Contact</Divider>
                                <Form.Item name="email" noStyle rules={[{ required: true }]}>
                                    <Input allowClear placeholder="Email" />
                                </Form.Item>
                                <Form.Item name="phone" noStyle>
                                    <Input allowClear placeholder="Phone" />
                                </Form.Item>
                            </Flex>
                            <br />
                        </div>
                    </div>
                </Card>
            </Form>
        </>
    );
}

export default AccountView;
