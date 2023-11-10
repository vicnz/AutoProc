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
];

export default TabPanes;
