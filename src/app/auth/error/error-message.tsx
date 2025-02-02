"use client";

import { Flex, Modal, Tag, Result } from "antd";
import { useEffect, useState } from "react";
import Image from "next/image";
// ─── Config ──────────────────────────────────────────────────────────────────
import { THEME_COLORS } from "@lib/theme/constant";
// ─── Base Component ──────────────────────────────────────────────────────────
function ErrorMessage() {
    const [open, setOpen] = useState(false);

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
                                <span style={{ color: THEME_COLORS.PRIMARY }}>AUTH ERROR</span>
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
                <Result
                    status="error"
                    title="Next Auth Error"
                    subTitle="Next Authentication Error occured, please try again.."
                />
            </Modal>
        </>
    );
}

export default ErrorMessage;
