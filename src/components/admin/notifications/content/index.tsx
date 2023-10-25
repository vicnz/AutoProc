'use client';

import { ShoppingCartOutlined, DesktopOutlined, EyeOutlined, ClearOutlined } from "@ant-design/icons";
import { Card, Tag } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useMemo } from "react";


const NotificationItem = (props: any) => {
    const router = useRouter()
    const { data, close } = props;
    const { type, title, description, createdAt, content } = data

    const actions = useMemo(() => {
        const action = [<span key={'clear'}><ClearOutlined /> Resolved</span>]
        const url = content?.ref
        if (type === 'delivery') {
            action.unshift(
                <Link href={`/administrator/procurements/${encodeURI(url)}`} onClick={() => close()}>
                    <EyeOutlined /> Details
                </Link>
            )
        }

        return action;
    }, [type, content])
    return (
        <Card
            style={{ marginBottom: 10 }}
            title={(type as string).toUpperCase()}
            extra={
                <>
                    {{
                        'delivery': <span><ShoppingCartOutlined /></span>,
                        'system': <span><DesktopOutlined /></span>
                    }[type as string]}
                </>

            }
            actions={actions}
        >
            <Card.Meta
                title={title}
                description={
                    <>
                        {description} <br />
                        <Tag>{dayjs(createdAt as string).format('MMMM DD, YYYY @ hh:mm a')}</Tag>
                    </>
                }
            />
        </Card>
    )
}

export default memo(NotificationItem)