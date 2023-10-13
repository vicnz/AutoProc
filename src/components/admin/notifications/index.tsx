'use client';

/**
 * * - NOTIFICATION SECTION
 * * - All System/Database/Client Notification
 * * - Are Shown Here
 */

import { BellOutlined, DeleteOutlined } from "@ant-design/icons";
import { App, Badge, Button, Drawer, Skeleton } from "antd";
import { useEffect, useState } from "react";
import useSWR from "swr";


const NotificationSection = function () {
    const { notification } = App.useApp()
    const [open, setOpen] = useState(false)
    const { data, isLoading, isValidating } = useSWR('/administrator/api/notification')

    useEffect(() => {
        if (data?.changed) {
            notification.info({ message: "This is A Sample Notification and Not Valid And Something Is Not A Valid Undefined To The Course of this world\nData: " + (data?.data || 0), })
        }
    }, [data])

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