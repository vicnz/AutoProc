"use client";

import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function TopBar() {
    const { refresh } = useRouter();
    return (
        <Flex align="center" justify="space-between">
            <Link href={"/utility/checker"} passHref>
                <Button icon={<ArrowLeftOutlined />} type="text">
                    Back
                </Button>
            </Link>
            <Button icon={<ReloadOutlined />} onClick={() => refresh()}>
                Refresh
            </Button>
        </Flex>
    );
}

export default TopBar;
