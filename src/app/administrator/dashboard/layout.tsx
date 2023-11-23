"use client";

import { ReactNode } from "react";
import { CompassOutlined, LineChartOutlined, ProjectOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
//components
import TabPane from "./components/tab-pane";
import GlobalHeader from "@components/admin/header";
import ContentWrapper from "@components/admin/content";
import ManualPage from "@components/shared/manual"; //TODO CREATE A GLOBAL MANUAL INTERCEPT

//configs
type DashboardLayoutProps = {
    children: ReactNode;
    reports: ReactNode;
};
const DashboardLayout = function (props: DashboardLayoutProps) {
    return (
        <ContentWrapper
            header={
                <GlobalHeader title={<div style={{ textTransform: "uppercase" }}>DASHBOARD</div>}>
                    <ManualPage
                        icon={<QuestionCircleOutlined />}
                        buttonProps={{ type: "text" }}
                        drawerProps={{ title: "Dashboard Manual" }}
                        pageProp={{ id: "", name: "Dashboard" }}
                    />
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
