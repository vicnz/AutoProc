"use client";

/**
 * * - NOTIFICATION SECTION
 * * - All System/Database/Client Notification
 * * - Are Shown Here
 */

import { BellOutlined, CheckCircleOutlined, ClearOutlined, DeleteOutlined, WarningOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Drawer, Skeleton } from "antd";
import { Fragment, memo, useState } from "react";
import useSWR from "swr";

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
                        <DeleteOutlined />
                    </>
                }
            >
                {data.map((item: any) => {
                    return (
                        <Fragment key={item.id}>
                            <Card
                                title={`Delivery`}
                                actions={[
                                    <span>
                                        <CheckCircleOutlined /> Resolved
                                    </span>,
                                    <span>
                                        <ClearOutlined /> Clear
                                    </span>,
                                ]}
                            >
                                <Card.Meta title={item.title} description={item.description} />
                            </Card>
                        </Fragment>
                    );
                })}
            </Drawer>
        </>
    );
};

export default memo(NotificationSection);
