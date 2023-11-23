"use client";

import { signIn, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { App, Button, Divider, Flex, Form, Input, Modal, Tag, Typography } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import Image from "next/image";
import Avatar from "boring-avatars";
import { useRouter } from "next/navigation";
// ─── Config ──────────────────────────────────────────────────────────────────
import { THEME_COLORS } from "@lib/theme/theme-config";
// ─── Base Component ──────────────────────────────────────────────────────────
function LoginClient() {
    const { message } = App.useApp();
    const [form] = Form.useForm();
    // ─────────────────────────────────────────────────────────────────────
    const [loading, setLoading] = useState(false); //Loading State
    const [open, setOpen] = useState(false); //Open Dialog
    const { replace } = useRouter();
    // ─────────────────────────────────────────────────────────────────────
    const onFinish = async () => {
        setLoading(true);
        const { username, password } = form.getFieldsValue();
        //? ─── Sign In User ────────────────────────────────────────────────────────────
        const result = await signIn("credentials", {
            redirect: false,
            password,
            username,
        });

        if (result?.error) {
            setLoading(false);
            message.open({ type: "error", duration: 2, content: "Login Error, Please check your Credentials" });
        } else {
            message.success("Welcome To AutoProc");
            if (result) {
                const session = await getSession();
                if (session) {
                    if (session.user.role === "ADMIN") {
                        // ─── Goto Administrator ──────
                        replace("/administrator");
                    }
                    if (session.user.role === "TRACKER" || session.user.role === "CHECKER") {
                        // ─── Goto Utility Users ──────
                        replace("/utility");
                    }
                    if (session.user.role === "USER") {
                        // ─── Goto Users ──────────────
                        replace("/users");
                    }
                }
            }
        }
    };

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <>
            <Modal
                open={open}
                centered
                destroyOnClose
                closable={false}
                title={
                    <>
                        <Flex align="center" justify="space-between">
                            <Flex align="center" gap={10}>
                                <Image src="/logo-small.png" alt="Page Logo" height={25} width={30} />
                                <span style={{ color: THEME_COLORS.PRIMARY }}>AUTOPROC SIGN IN</span>
                            </Flex>
                            <Tag color="orange">BETA</Tag>
                        </Flex>
                    </>
                }
                footer={false}
                width={400}
                styles={{
                    content: {
                        borderTop: `solid ${THEME_COLORS.PRIMARY} 10px`,
                    },
                }}
            >
                <br />
                <Flex justify="center" align="center">
                    <Avatar
                        variant="beam"
                        name="login"
                        size={100}
                        colors={[THEME_COLORS.PRIMARY, THEME_COLORS.ACCENT]}
                    />
                </Flex>
                <br />
                <Typography.Paragraph style={{ textAlign: "center" }}>
                    Log In with your credentials to access AutoProc Management Control...
                </Typography.Paragraph>
                <Divider />
                <Form form={form} onFinish={onFinish} action={"/api/auth/callback/credentials"}>
                    <Form.Item name="username" rules={[{ required: true, message: "Field Is Required" }]}>
                        <Input size="large" placeholder="Username Or Email" autoFocus />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: "Field Is Required" }]}>
                        <Input.Password size="large" placeholder="Password" />
                    </Form.Item>
                    <Button
                        htmlType="submit"
                        type="primary"
                        block
                        size="large"
                        icon={<LoginOutlined />}
                        loading={loading}
                    >
                        Sign In
                    </Button>
                </Form>
            </Modal>
        </>
    );
}

export default LoginClient;
