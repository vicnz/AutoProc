"use client";

import { BellOutlined, WarningOutlined } from "@ant-design/icons";
import { Badge, Button, Divider, Drawer, Segmented, Skeleton, Tooltip } from "antd";
import { memo, useEffect, useState } from "react";
import useSWR from "swr";

import TodayView from "./day-view";
import MonthView from "./month-view";
import PopupNotifications from "../notif-popup";

const NotificationSection = function () {
    const [open, setOpen] = useState(false);
    const [notifyCategory, setNotifyCategory] = useState<"today" | "month">("today");
    const { data, error, isLoading } = useSWR(`/administrator/components/notifications/api?count=true&days=${30}`);

    const onShowDrawer = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === "/") {
            setOpen(true);
        }
    };

    //Component Effect
    useEffect(() => {
        window.addEventListener("keydown", onShowDrawer);
        return () => window.removeEventListener("keydown", onShowDrawer);
    }, []);

    if (error) {
        return (
            <>
                <WarningOutlined />
            </>
        );
    }
    if (!data || isLoading) {
        return <Skeleton.Avatar active />;
    }
    const notif = data.count > 0; //toggle badge
    return (
        <>
            <PopupNotifications />

            <Tooltip
                title={
                    <span>
                        Notifications
                        <Divider type="vertical" />
                        <span style={{ fontWeight: "bold" }}>{data.count}</span>
                    </span>
                }
            >
                <Badge dot={notif}>
                    <Button icon={<BellOutlined />} type="text" onClick={() => setOpen(true)} />
                </Badge>
            </Tooltip>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                title={"Notifications"}
                extra={
                    <>
                        <Segmented
                            options={[
                                { label: "Today", value: "today" },
                                { label: "All", value: "month" },
                            ]}
                            onChange={(e: any) => setNotifyCategory(e)}
                            defaultValue={"today"}
                        />
                    </>
                }
            >
                {
                    {
                        today: <TodayView close={() => setOpen(false)} />,
                        month: <MonthView close={() => setOpen(false)} />,
                    }[notifyCategory]
                }
            </Drawer>
        </>
    );
};

export default memo(NotificationSection);
