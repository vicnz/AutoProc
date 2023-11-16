import { Alert, Divider, Flex, Result, Space } from "antd";
import React from "react";
import Image from "next/image";
import CheckerLogo from "@media/checker-logo.svg";
import { InfoCircleOutlined } from "@ant-design/icons";

function Checker() {
    return (
        <Space direction="vertical" style={{ width: "100%", padding: "0px 0px 0px 24px" }}>
            <Flex vertical align="center" style={{ width: "100%" }}>
                <br />
                <br />
                <Image alt="App Logo" src={CheckerLogo} height={175} width={200} />
                <br />
                <Image alt="App Logo" src="/logo-medium.png" height={38} width={300} />
            </Flex>
            <Divider>Delivery Checker</Divider>
            <Result
                status="warning"
                title="Under-Development"
                subTitle="The Checker Utility User App is still in Development and expected to have a PREVIEW on AutoProc V2"
            />
            <Flex align="center" justify="center">
                <Alert
                    message={
                        <span>
                            <InfoCircleOutlined /> PORTABLE VERSION
                        </span>
                    }
                    description={
                        <>
                            This Feature is the <strong>PORTABLE</strong> version of the{" "}
                            <strong>Delivery Manager</strong> on the AutoProc Administrator Page Section. With Limited
                            Yet Comprehensive Access to Document Deliveries without the geist of delivering Notices
                            Manually to the Procurement Office
                        </>
                    }
                />
            </Flex>
        </Space>
    );
}

export default Checker;
