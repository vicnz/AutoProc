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

        if (!('Notification' in window)) {
            //browser does not support 
        } else if (Notification.permission === 'denied') {
            Notification.requestPermission() //request permission
        }

        source.onmessage = (e: any) => {
            const sse = JSON.parse(e.data)
            if (sse.type === 'delivery') {
                //TODO make this feasable
                const { title, description } = JSON.parse(sse.message);
                notification.warning({ description, message: title, duration: 5 })
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