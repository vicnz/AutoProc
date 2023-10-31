"use client";

//libs
import { AuditOutlined, BarChartOutlined, DashboardOutlined, ProjectOutlined } from "@ant-design/icons";
import { Skeleton, TabsProps, Tag } from "antd";
import dynamic from "next/dynamic";
//components
import TabPaneWrapper from "./tab-pane";
const Overview = dynamic(async () => await import("@components/admin/layouts/dashboard/statistics"), {
    loading: () => <Skeleton />,
});
const Supplier = dynamic(async () => await import("@components/admin/layouts/dashboard/supplier"), {
    loading: () => <Skeleton />,
});
const Reports = dynamic(async () => await import("@components/admin/layouts/dashboard/reports"), {
    loading: () => <Skeleton />,
});
//config

const TabPanes: TabsProps["items"] = [
    {
        key: "dashboard",
        label: (
            <span>
                <BarChartOutlined />
                Overview
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
        key: "reports",
        label: (
            <span>
                <ProjectOutlined />
                Reports
            </span>
        ),
        destroyInactiveTabPane: true,
        tabKey: "reports",
        children: (
            <TabPaneWrapper>
                <Reports />
            </TabPaneWrapper>
        ),
    },
    {
        key: "supplier",
        label: (
            <span>
                <AuditOutlined />
                &nbsp;Suppliers&nbsp;<Tag color="red">ALPHA</Tag>
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
    {
        key: "activity",
        label: (
            <span>
                <DashboardOutlined />
                &nbsp;Activity&nbsp;<Tag color="red">PREVIEW</Tag>
            </span>
        ),
        destroyInactiveTabPane: true,
        tabKey: "activity",
        children: (
            <TabPaneWrapper>
                <p>Activity Pane : YET TO BE IMPLEMENTED</p>
            </TabPaneWrapper>
        ),
    },
];

export default TabPanes;
