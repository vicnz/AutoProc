"use client";

import React, { Fragment } from "react";
import Image from "next/image";
import CheckerLogo from "@media/checker-logo.svg";
import { Badge, Card, Divider, Flex, List, Result, Skeleton, Space, theme } from "antd";
import { CheckCircleOutlined, CheckSquareOutlined, MinusCircleOutlined } from "@ant-design/icons";

function Description() {
    const { token } = theme.useToken();
    return (
        <>
            <Flex align="center" justify="center">
                <Image alt="App Logo" src={CheckerLogo} height={175} width={200} />
            </Flex>
            <Divider>DELIVERY CHECKER</Divider>
            <p style={{ color: token.colorTextDescription }}>
                Delivery Checker Tool. This is the Portable Version of the Deliver Checker on AutoProc Administrator.
            </p>
            <br />
            <Flex style={{ width: "100%" }} justify="stretch" gap={15}>
                <Flex vertical gap={10}>
                    {new Array(5).fill(0).map((item, idx) => {
                        return (
                            <Fragment key={`idx${idx}`}>
                                <Space size="small" style={{ width: "100%" }}>
                                    {idx < 3 ? (
                                        <>
                                            <CheckCircleOutlined size={38} style={{ color: token.colorSuccess }} />
                                            <Skeleton.Input
                                                size="small"
                                                block
                                                style={{ width: "inherit", background: token.colorSuccess + "50" }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <MinusCircleOutlined size={38} />
                                            <Skeleton.Input size="small" block />
                                        </>
                                    )}
                                </Space>
                            </Fragment>
                        );
                    })}
                </Flex>
                <Card style={{ width: "100%" }}>
                    <Skeleton round paragraph={{ rows: 2 }} />
                </Card>
            </Flex>
            <br />
            <p style={{ color: token.colorTextDescription }}>
                This process requires the CHECKER to enter his/her passcode to verify the updated delivery checklist.
            </p>
            <Divider />
            <p style={{ color: token.colorTextDescription }}>Select PO Number</p>
        </>
    );
}

export default Description;
