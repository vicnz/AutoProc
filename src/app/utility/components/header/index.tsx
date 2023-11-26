"use client";

import { Avatar, Flex, Space, Tag, theme } from "antd";
import Image from "next/image";
import SignOut from "@components/signout-btn";
import { LogoutOutlined } from "@ant-design/icons";

function UtilityHeaderComponent() {
    const { token } = theme.useToken();
    return (
        <Flex
            style={{
                height: "56px",
                width: "100%",
                padding: 15,
                background: `${token.colorPrimary}20`,
            }}
            align="center"
            justify="space-between"
        >
            <Space align="center">
                <Image height={24} width={28} src="/logo-small.png" alt="sds" />
                <strong style={{ color: token.colorPrimary }}>UTILITY USER</strong>
                <Tag color="orange">BETA</Tag>
            </Space>
            <SignOut icon={<LogoutOutlined />}>Sign Out</SignOut>
        </Flex>
    );
}

export default UtilityHeaderComponent;
