"use client";
import React, { ReactNode, useEffect, useState } from "react";
import TabPane from "./tab-pane";
import { Spin, Tabs } from "antd";
import { CheckOutlined, ScanOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";

type TabRendererProps = {
    children: ReactNode;
    checker: ReactNode;
};
function TabRenderer(props: TabRendererProps) {
    const session = useSession();
    if (!session.data) {
        return (
            <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
                <Spin spinning />
            </div>
        );
    }

    let userType = session.data.user.role;
    return (
        <Tabs
            size="middle"
            destroyInactiveTabPane
            defaultActiveKey={userType || "TRACKER"}
            style={{ height: "100%", width: "100%" }}
            items={[
                {
                    key: "TRACKER",
                    label: (
                        <span>
                            <ScanOutlined /> Tracker
                        </span>
                    ),
                    disabled: userType === "CHECKER",
                    children: <TabPane>{props.children}</TabPane>,
                },
                {
                    key: "CHECKER",
                    label: (
                        <span>
                            <CheckOutlined /> Checker
                        </span>
                    ),
                    disabled: userType === "TRACKER",
                    children: <TabPane>{props.checker}</TabPane>,
                },
            ]}
            tabPosition="bottom"
            centered
        />
    );
}

export default TabRenderer;
