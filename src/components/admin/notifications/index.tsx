"use client";

/**
 * * - NOTIFICATION SECTION
 * * - All System/Database/Client Notification
 * * - Are Shown Here
 */

import { BellOutlined, CheckCircleOutlined, ClearOutlined, DesktopOutlined, EyeOutlined, ShoppingCartOutlined, WarningOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Drawer, Empty, Segmented, Skeleton, Tag } from "antd";
import dayjs from "dayjs";
import { Fragment, memo, useMemo, useState } from "react";
import useSWR from "swr";

import NotificationItem from './content'

const numberOfhours = 1000; //this should be dynamic
const NotificationSection = function () {
    const [open, setOpen] = useState(false);
    const { data, error, isLoading } = useSWR(`/administrator/api/notification?all=true&hour=${numberOfhours}`);

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
    const notif = data.length > 0;
    return (
        <>
            <Badge dot={notif}>
                <Button icon={<BellOutlined />} type="text" onClick={() => setOpen(true)} />
            </Badge>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                title={"Notifications"}
                extra={
                    <>
                        <Segmented options={[{ label: 'Today', value: 'today' }, { label: '14 Days', value: 'twoweek' }]} />
                    </>
                }
            >
                {
                    data.length === 0 ?
                        <>
                            <Empty />
                        </> :
                        <>
                            {data?.map((item: any) => {
                                return (
                                    <Fragment key={item.id}>
                                        <NotificationItem data={item} close={() => setOpen(false)} />
                                    </Fragment>
                                );
                            })}
                        </>
                }
            </Drawer>
        </>
    );
};

export default memo(NotificationSection);
