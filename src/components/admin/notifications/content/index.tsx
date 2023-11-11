"use client";

import { ShoppingCartOutlined, DesktopOutlined, EyeOutlined, ClearOutlined, WarningOutlined } from "@ant-design/icons";
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
    const actions = () => {
        const action = [
            <>
                <Popconfirm
                    title="Clear Me?"
                    description="Remove this Notification?"
                    onConfirm={onResolve}
                    key={"clear"}
                    placement="left"
                >
                    <ClearOutlined /> Clear
                </Popconfirm>
            </>,
        ];
        const url = content?.ref; //ADD THE REFERENCE ID []

        /**ADD VIEW BUTTON WHEN DELIVERY */
        if (type === "delivery") {
            action.unshift(
                <>
                    <Link
                        href={`/administrator/procurements/${encodeURIComponent(url)}`}
                        onClick={() => close()}
                        passHref
                    >
                        <EyeOutlined /> Details
                    </Link>
                </>
            );
        }

        return action;
    };

    //
    return (
        <Card
            style={{ marginBottom: 10 }}
            title={
                <>
                    {
                        {
                            delivery: <ShoppingCartOutlined title={title.toUpperCase()} />,
                            system: <DesktopOutlined title={title.toUpperCase()} />,
                            critical: <WarningOutlined title={title.toUpperCase()} />,
                        }[type as string]
                    }
                </>
            }
            extra={
                <>
                    <span>{dayjs(createdAt as string).format("MMM DD, YYYY (hh:mm A)")}</span>
                </>
            }
            actions={actions()}
        >
            <Card.Meta title={title} description={<>{description}</>} />
        </Card>
    );
};

export default memo(NotificationItem);
