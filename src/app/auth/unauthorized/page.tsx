"use client";

import { ArrowLeftOutlined, LockFilled } from "@ant-design/icons";
import { Modal, Flex, Tag, Typography, Divider, Button } from "antd";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// ─── Config ──────────────────────────────────────────────────────────────────
import UnauthorizedImage from "@media/unauthorized.jpg";
import { THEME_COLORS } from "@lib/theme/constant";
// ─── Base Components ─────────────────────────────────────────────────────────
function Unauthorized() {
    const [open, setOpen] = useState(false);
    const { back } = useRouter();

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
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
                            <span style={{ color: THEME_COLORS.PRIMARY }}>UNAUTHORIZED</span>
                        </Flex>
                        <Tag color="orange">BETA</Tag>
                    </Flex>
                </>
            }
            footer={false}
            styles={{
                content: {
                    borderTop: `solid ${THEME_COLORS.PRIMARY} 10px`,
                },
            }}
        >
            <br />
            <Flex align="center" justify="center" vertical>
                <Image src={UnauthorizedImage} width={475} height={300} alt="error-image" />
                <Divider>
                    <LockFilled />
                </Divider>
                <Typography.Paragraph style={{ fontSize: "1.1em" }}>
                    <Typography.Text style={{ color: "orangered" }} strong>
                        Unauthorized User Access
                    </Typography.Text>{" "}
                    You are trying to access secured pages or your{" "}
                    <Typography.Text style={{ color: "orangered" }} strong>
                        User Priviledge
                    </Typography.Text>{" "}
                    is not supported on this page.
                </Typography.Paragraph>
                <br />
                <Button onClick={() => back()} icon={<ArrowLeftOutlined />}>
                    Go Back
                </Button>
            </Flex>
        </Modal>
    );
}

export default Unauthorized;
