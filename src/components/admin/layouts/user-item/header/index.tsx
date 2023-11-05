"use client";

/**
 * * USER INFO ITEM HEADER
 * * SHARED HEADER
 */

//libs
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Space } from "antd";
import { memo } from "react";
//components
import GlobalHeader from "@components/admin/header";
import Link from "next/link";

const UserInfoHeader = function () {
    return (
        <>
            <GlobalHeader
                title={
                    <Space>
                        <span>User Information</span>
                    </Space>
                }
                back={
                    <Link href={`/administrator/users`} passHref>
                        <Button icon={<ArrowLeftOutlined />} type="text">
                            Users
                        </Button>
                    </Link>
                }
            >
                <Divider type="vertical" />
                <Button icon={<QuestionCircleOutlined />} type="text" />
            </GlobalHeader>
        </>
    );
};

export default memo(UserInfoHeader);
