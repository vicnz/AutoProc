"use client";

import { ReactNode } from "react";
import { CompassOutlined, LineChartOutlined, ProjectOutlined, QuestionCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Divider, Skeleton, Tabs, Typography } from "antd";
import dynamic from "next/dynamic";
import TabPane from "./components/tab-pane";
import GlobalHeader from "@components/admin/header";
import ContentWrapper from "@components/admin/content";
import ManualPage from "@components/shared/manual";
import { options } from "@lib/client/remark-gfm";
import { useRouter } from "next/navigation";
const Manual = dynamic(async () => await import("./man/index.mdx"), { ssr: false, loading: () => <Skeleton active /> });
//configs
type DashboardLayoutProps = {
    children: ReactNode;
    reports: ReactNode;
};
const DashboardLayout = function (props: DashboardLayoutProps) {
    const { refresh } = useRouter()
    return (
        <ContentWrapper
            header={
                <GlobalHeader title={<div style={{ textTransform: "uppercase" }}>DASHBOARD</div>}>
                    <Button icon={<ReloadOutlined />} type='text' onClick={() => { refresh() }}>Refresh</Button>
                    <Divider type='vertical' />
                    <ManualPage
                        icon={<QuestionCircleOutlined />}
                        buttonProps={{ type: "text" }}
                        drawerProps={{ title: "Documentation" }}
                        pageProp={{ id: "", name: "Dashboard" }}
                    >
                        <Manual components={options.components as any} />
                    </ManualPage>
                </GlobalHeader>
            }
        >
            <Tabs
                tabPosition="left"
                defaultActiveKey="default"
                items={[
                    {
                        key: "default",
                        label: (
                            <>
                                <LineChartOutlined /> Overview
                            </>
                        ),
                        children: <TabPane>{props.children}</TabPane>,
                    },
                    {
                        key: "reports",
                        label: (
                            <>
                                <ProjectOutlined /> Reports
                            </>
                        ),
                        children: <TabPane>{props.reports}</TabPane>,
                    },
                    {
                        disabled: true,
                        key: "activity",
                        label: (
                            <>
                                <CompassOutlined /> Activity
                            </>
                        ),
                        children: <TabPane></TabPane>,
                    },
                ]}
            />
        </ContentWrapper>
    );
};

export default DashboardLayout;
