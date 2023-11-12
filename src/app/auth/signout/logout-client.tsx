"use client";

import { Button, Divider, Flex, Modal, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import Image from "next/image";
import Avatar from "boring-avatars";
import { signOut } from "next-auth/react";
import { LogoutOutlined } from "@ant-design/icons";

function LogoutClient() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    const signingOut = async () => {
        await signOut({ callbackUrl: "/" });
        setLoading(true);
    };

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
                                <span style={{ color: "#C0252A" }}>AUTOPROC SIGN OUT</span>
                            </Flex>
                            <Tag color="orange">BETA</Tag>
                        </Flex>
                    </>
                }
                footer={false}
                width={400}
                styles={{
                    content: {
                        borderTop: "solid #C0252A 10px",
                    },
                }}
            >
                <br />
                <Flex justify="center" align="center">
                    <Avatar variant="beam" name="logout" size={100} colors={["#C0252A", "#38424F"]} />
                </Flex>
                <br />
                <Typography.Paragraph style={{ textAlign: "center" }}>
                    Signing Out... Hope to see you again tomorrow... Bye 👋🏻
                </Typography.Paragraph>
                <Divider />
                <Button
                    htmlType="submit"
                    type="primary"
                    block
                    size="large"
                    icon={<LogoutOutlined />}
                    onClick={signingOut}
                    loading={loading}
                >
                    Sign Out
                </Button>
            </Modal>
        </>
    );
}

export default LogoutClient;
