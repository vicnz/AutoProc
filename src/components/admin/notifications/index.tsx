'use client';

/**
 * * - NOTIFICATION SECTION
 * * - All System/Database/Client Notification
 * * - Are Shown Here
 */

import { BellOutlined, DeleteOutlined } from "@ant-design/icons";
import { App, Badge, Button, Drawer, Skeleton } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";


const NotificationSection = function () {
    const { notification } = App.useApp()
    const [open, setOpen] = useState(false)

    const source = new EventSource(`/administrator/api/notification?_client_date=${dayjs().toISOString()}`)
    useEffect(() => {
        console.log('Ready State: ', source.readyState)
        source.onmessage = (e) => {
            const sse = JSON.parse(e.data)
            if (sse.type === 'notif') {
                //TODO make this feasable
                // notification.info({ message: 'Notification Server Sent Message' }) 
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

export default NotificationSection;