"use client";

import Image from "next/image";
import { Button, ConfigProvider, Flex, Modal, Result, Typography } from "antd";
import { useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";

function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const [state, setState] = useState(false);
    useEffect(() => {
        setState(true);
        console.log(error);
    }, [error]);
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
            <ConfigProvider theme={{ token: { colorPrimary: "#C0252A", fontFamily: "Poppins" } }}>
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
                                    <span style={{ color: "#C0252A" }}>CLIENT ERROR</span>
                                </Flex>
                            </Flex>
                        </>
                    }
                    width={400}
                    footer={false}
                    styles={{
                        content: {
                            borderTop: "solid #C0252A 10px",
                        },
                    }}
                >
                    <Result
                        status="error"
                        title="Client Error"
                        subTitle={
                            <>
                                {"An Unexpected "}
                                <Typography.Text italic style={{ color: "orangered" }}>
                                    Client-Error
                                </Typography.Text>{" "}
                                occured, please refresh the page or return back to previous page
                            </>
                        }
                        extra={
                            <>
                                <Button icon={<ReloadOutlined />} onClick={() => reset()}>
                                    Refresh Page
                                </Button>
                            </>
                        }
                    />
                </Modal>
            </ConfigProvider>
        </div>
    );
}

export default ErrorPage;
