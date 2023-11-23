"use client";

import Image from "next/image";
import { Button, Flex, Modal, Result, Typography } from "antd";
import { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import ThemeConfig, { THEME_COLORS } from "@lib/theme/theme-config";

function GlobalNotFoundPage() {
    const [state, setState] = useState(false);
    const pathname = usePathname();
    const { back } = useRouter();

    useEffect(() => {
        setState(true);
    }, []);

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                background:
                    "radial-gradient(circle, transparent 25%, #FFFFFF  26%),linear-gradient(0deg, transparent 44%, #38424F 45%, #38424F 55%, transparent 56%), linear-gradient(90deg, transparent 44%, #38424F 45%, #38424F 55%, transparent 56%)",
                backgroundSize: "2em 2em",
                backgroundColor: "white",
                opacity: 0.2,
            }}
        >
            <ThemeConfig token={{ colorPrimary: THEME_COLORS.PRIMARY }}>
                <Modal
                    open={state}
                    centered
                    destroyOnClose
                    closable={false}
                    title={
                        <>
                            <Flex align="center" justify="space-between">
                                <Flex align="center" gap={10}>
                                    <Image src="/logo-small.png" alt="Page Logo" height={25} width={30} />
                                    {/* <Typography.Text type='secondary'>404</Typography.Text> */}
                                    <span style={{ color: "#C0252A" }}>404</span>
                                </Flex>
                            </Flex>
                        </>
                    }
                    width={400}
                    footer={false}
                    styles={{
                        content: {
                            borderTop: `solid ${THEME_COLORS.PRIMARY} 10px`,
                        },
                    }}
                >
                    <Result
                        status="error"
                        title="Page Not Found"
                        subTitle={
                            <>
                                {" "}
                                <Typography.Text italic style={{ color: "orangered" }}>
                                    {pathname}
                                </Typography.Text>{" "}
                                does not exists or is not available. Go back to previous page.
                            </>
                        }
                        extra={
                            <>
                                <Button icon={<ArrowLeftOutlined />} onClick={() => back()}>
                                    Go Back
                                </Button>
                            </>
                        }
                    />
                </Modal>
            </ThemeConfig>
        </div>
    );
}

export default GlobalNotFoundPage;
