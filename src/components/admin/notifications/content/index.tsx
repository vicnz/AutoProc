"use client";

import { ShoppingCartOutlined, DesktopOutlined, EyeOutlined, ClearOutlined } from "@ant-design/icons";
import { App, Card, Popconfirm, Tag } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { memo, useMemo } from "react";
import { mutate } from "swr";

/**
 * * RENDER NOTIFICATION ITEM
 * * CARD
 */

const NotificationItem = (props: any) => {
    const { message } = App.useApp();
    const { data, close } = props;
    const { type, title, description, createdAt, content, id } = data;

    //DELETE Notification Item
    const onResolve = async () => {
        const response = await fetch(`/administrator/api/notification?id=${id}`, {
            method: "DELETE",
            body: JSON.stringify({ id: id }),
        });

        if (response.ok) {
            message.info(`Removed Notification Item ${title}`);
            mutate("/administrator/api/notification").then(() => {
                close();
            }); //Reload Notification List
        } else {
            message.error("An Error Occured!, Please Try Again...");
        }
    };

    //Render Actions Buttons
    const actions = useMemo(() => {
        const action = [
            <Popconfirm
                title="Clear this Notification?"
                description="Remove this Notification Completely?"
                onConfirm={onResolve}
                key={"clear"}
                placement="left"
            >
                <ClearOutlined /> Clear
            </Popconfirm>,
        ];
        const url = content?.ref; //ADD THE REFERENCE ID []

        /**ADD VIEW BUTTON WHEN DELIVERY */
        if (type === "delivery") {
            action.unshift(
                <Link href={`/administrator/procurements/${encodeURIComponent(url)}`} onClick={() => close()} passHref>
                    <EyeOutlined /> Details
                </Link>
            );
        }

        return action;
    }, [type, content]);

    //
    return (
        <Card
            style={{ marginBottom: 10 }}
            title={(type as string).toUpperCase()}
            extra={
                <>
                    {
                        {
                            delivery: (
                                <span>
                                    <ShoppingCartOutlined />
                                </span>
                            ),
                            system: (
                                <span>
                                    <DesktopOutlined />
                                </span>
                            ),
                        }[type as string]
                    }
                </>
            }
            actions={actions}
        >
            <Card.Meta
                title={title}
                description={
                    <>
                        {description} <br />
                        <Tag>{dayjs(createdAt as string).format("MMMM DD, YYYY @ hh:mm a")}</Tag>
                    </>
                }
            />
        </Card>
    );
};

export default memo(NotificationItem);
