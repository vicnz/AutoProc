"use client";

import {
    BellFilled,
    BellOutlined,
    DesktopOutlined,
    ExclamationOutlined,
    ShoppingCartOutlined,
    WarningOutlined,
} from "@ant-design/icons";
import { CardProps, Card, Skeleton, Result, Empty, List, Avatar, Space } from "antd";
import dayjs from "dayjs";
import React from "react";
import useSWR from "swr";

function NotificationOutline(props: CardProps & { height?: number }) {
    const { data, error, isLoading } = useSWR("/administrator/api/notification?type=today&days=1");
    const { title, height, ...rest } = props;

    return (
        <Card
            {...rest}
            title={title}
            bodyStyle={{ padding: 0, margin: 0, position: "relative", height, width: "100%", overflow: "auto" }}
        >
            <div style={{ height, width: "100%", position: "absolute", top: 0, left: 0, padding: "15px 25px" }}>
                {isLoading || !data ? (
                    <Skeleton active />
                ) : error ? (
                    <Result status="error" title="Failed to Fetch Data" />
                ) : (
                    <RenderNotificationsItem data={data.data} />
                )}
            </div>
        </Card>
    );
}

export default NotificationOutline;

const RenderNotificationsItem = (props: { data: Array<any> }) => {
    if (props.data.length < 1) {
        return <Empty description="No New Notifications For Today" />;
    }
    return (
        <List
            itemLayout="horizontal"
            dataSource={props.data}
            renderItem={(item: any) => {
                return (
                    <List.Item key={item.id}>
                        <Card style={{ width: "100%" }}>
                            <Card.Meta
                                avatar={
                                    <Avatar
                                        icon={
                                            <>
                                                {
                                                    {
                                                        delivery: <ShoppingCartOutlined />,
                                                        system: <DesktopOutlined />,
                                                        critical: <WarningOutlined />,
                                                    }[item.type as string]
                                                }
                                            </>
                                        }
                                    />
                                }
                                title={
                                    <>
                                        <span>{item.title}</span>
                                        {" | "}
                                        <span>{dayjs(item.createdAt as string).format("hh:mm A")}</span>
                                    </>
                                }
                                description={
                                    <>
                                        <span>{(item.description as string).substring(0, 100)}</span>
                                    </>
                                }
                            />
                        </Card>
                    </List.Item>
                );
            }}
        />
    );
};
