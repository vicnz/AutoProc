"use client";

import ManualWrapper from "@components/shared/manual";
import React from "react";
import dynamic from "next/dynamic";
import { options } from "@lib/client/remark-gfm";
import { Skeleton } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
const Manual = dynamic(async () => await import("../man/index.mdx"), {
    ssr: false,
    loading: () => <Skeleton active />,
});

function ManualPage() {
    return (
        <ManualWrapper
            icon={<QuestionCircleOutlined />}
            buttonProps={{ type: "text" }}
            drawerProps={{ title: "Users Management Manual" }}
            pageProp={{ id: "", name: "User Management" }}
        >
            <Manual components={options.components as any} />
        </ManualWrapper>
    );
}

export default ManualPage;
