"use client";

import { InfoCircleOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm, Space, Tooltip, Typography, theme } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";

const UtilityHeader = function () {
    const { token } = theme.useToken();
    const { push } = useRouter();
    const [loading, setLoading] = useState(false);

    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 10px" }}>
            <Flex align="center" gap={10}>
                <Image height={24} width={28} src="/logo-small.png" alt="sds" />
                <span style={{ color: token.colorPrimary }}>AUTOPROC</span>
                <span>/</span>
                <span style={{ color: token.colorPrimary }}>UTILITY APP</span>
            </Flex>
            <Link href="/auth/signout" passHref>
                <Button
                    icon={<LogoutOutlined />}
                    danger
                    type="primary"
                    onClick={() => setLoading(true)}
                    loading={loading}
                >
                    Sign Out
                </Button>
            </Link>
        </div>
    );
};

export default memo(UtilityHeader);
