'use client';

/**
 * * - NOTIFICATION SECTION
 * * - All System/Database/Client Notification
 * * - Are Shown Here
 */

/**
 * TODO - Make it listen to all sort of notifications
 */

import { BellOutlined, DeleteOutlined, WarningOutlined } from "@ant-design/icons";
import { App, Badge, Button, Drawer, Skeleton } from "antd";
import dayjs from "dayjs";
import { memo, useCallback, useEffect, useState } from "react";


const source = new EventSource(`/administrator/api/notify?_client_date=${dayjs().toISOString()}`) //todo -> check if reinitializing

const NotificationSection = function () {
    const { notification } = App.useApp()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        source.onmessage = (e: any) => {
            const sse = JSON.parse(e.data)
            if (sse.type === 'notif') {
                //TODO make this feasable
                console.log(JSON.parse(sse.message))
                notification.warning({ message: "A Procurement Item is Delayed", duration: 5 })
            }
        }
    }, [])

    return (
        <>
            <Badge dot>
                <Button icon={<BellOutlined />} type='text' onClick={() => setOpen(true)} />
            </Badge>
            <Drawer open={open} onClose={() => setOpen(false)} title={'Notifications'} extra={<><DeleteOutlined /></>}>
                <Skeleton active avatar />
            </Drawer>
        </>
    )
}

export default memo(NotificationSection);