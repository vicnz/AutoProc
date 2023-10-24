"use client";

//libs
import { AuditOutlined, BarChartOutlined } from "@ant-design/icons";
import { Skeleton, TabsProps, Tag } from "antd";
import dynamic from "next/dynamic";
import TabPaneWrapper from "./tab-pane";
//components
const Overview = dynamic(async () => await import("@/components/admin/layouts/statistics"), {
    loading: () => <Skeleton paragraph={{ rows: 25 }} />,
});
const Supplier = dynamic(async () => await import("@/components/admin/layouts/supplier"), {
    loading: () => <Skeleton paragraph={{ rows: 25 }} />,
});
//config

const TabPanes: TabsProps["items"] = [
    {
        key: "dashboard",
        label: (
            <span>
                <BarChartOutlined />
                &nbsp;Overview&nbsp;<Tag color="orange">beta</Tag>
            </span>
        ),
        destroyInactiveTabPane: true,
        tabKey: "dashboard",
        children: (
            <TabPaneWrapper>
                <Overview />
            </TabPaneWrapper>
        ),
    },
    {
        key: "supplier",
        label: (
            <span>
                <AuditOutlined />
                &nbsp;Suppliers&nbsp;<Tag color="red">alpha</Tag>
            </span>
        ),
        destroyInactiveTabPane: true,
        tabKey: "suppliers",
        children: (
            <TabPaneWrapper>
                <Supplier />
            </TabPaneWrapper>
        ),
    },
];

export default TabPanes;
