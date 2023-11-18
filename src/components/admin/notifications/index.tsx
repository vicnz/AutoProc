"use client";

/**
 * * - NOTIFICATION SECTION
 * * - All System/Database/Client Notification
 * * - Are Shown Here
 */

import { BellOutlined, WarningOutlined } from "@ant-design/icons";
import { Badge, Button, Divider, Drawer, Segmented, Skeleton, Tooltip } from "antd";
import { memo, useEffect, useState } from "react";
import useSWR from "swr";

import NotifToday from "./content/today";
import Notif30Days from "./content/month";

const numOfDays = 1000; //TODO fetch this field from database settings
//
const NotificationSection = function () {
    const [open, setOpen] = useState(false);
    const [notifyCategory, setNotifyCategory] = useState<"today" | "month">("today");
    const { data, error, isLoading } = useSWR(`/administrator/api/notification?count=true&days=${numOfDays}`);

    const onShowDrawer = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === ".") {
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
        return <Skeleton.Avatar />;
    }
    const notif = data.count > 0; //toggle badge
    return (
        <>
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
                                { label: "30 Days", value: "month" },
                            ]}
                            onChange={(e: any) => setNotifyCategory(e)}
                            defaultValue={"today"}
                        />
                    </>
                }
            >
                {
                    {
                        today: <NotifToday close={() => setOpen(false)} />,
                        month: <Notif30Days close={() => setOpen(false)} />,
                    }[notifyCategory]
                }
            </Drawer>
        </>
    );
};

export default memo(NotificationSection);
