"use client";

import { FlagOutlined, NotificationOutlined, QrcodeOutlined, ScanOutlined } from "@ant-design/icons";
import ScannerLogo from "@media/scanner-logo.svg";
import { Avatar, Divider, Flex, Steps, theme } from "antd";
import Image from "next/image";
// ─────────────────────────────────────────────────────────────────────────────
function Description() {
    const { token } = theme.useToken();
    return (
        <>
            <Flex align="center" justify="center">
                <Image alt="App Logo" src={ScannerLogo} height={150} width={175} />
            </Flex>
            <Divider>DOCUMENT TRACKER</Divider>
            <p style={{ color: token.colorTextDescription }}>
                Tracing the Offices Where the Document Has Been Processed and/or Currenlty Located
            </p>
            <Steps
                items={[
                    {
                        icon: <Avatar icon={<QrcodeOutlined />} style={{ background: token.colorPrimary }} />,
                        title: "Generate QRCode",
                        description: (
                            <span style={{ color: token.colorTextDescription }}>
                                Generate and Attach QR Tracker in Document
                            </span>
                        ),
                        status: "process",
                    },
                    {
                        icon: <Avatar icon={<ScanOutlined />} style={{ background: token.colorPrimary }} />,
                        title: "Scan QR Code",
                        description: (
                            <span style={{ color: token.colorTextDescription }}>
                                Scan To Initiate Tracking using the Utility Tracker
                            </span>
                        ),
                        status: "process",
                    },
                    {
                        icon: <Avatar icon={<FlagOutlined />} style={{ background: token.colorPrimary }} />,
                        title: "Flagged Location",
                        description: (
                            <span style={{ color: token.colorTextDescription }}>
                                System then writes to the document route which office it is currently located.
                            </span>
                        ),
                        status: "process",
                    },
                    {
                        title: "Added Tracking",
                        description: (
                            <span style={{ color: token.colorTextDescription }}>
                                Cycle Repeats at Step 2 Until Document Process is Completed
                            </span>
                        ),
                        status: "finish",
                    },
                ]}
            />
            <Divider />
            <p style={{ color: token.colorTextDescription }}>Select Destination Office.</p>
        </>
    );
}

export default Description;
