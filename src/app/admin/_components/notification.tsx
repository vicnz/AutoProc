'use client';

import { useState } from 'react'
import { Badge, Button, App, Drawer, Tooltip, Space, Card, Divider, Empty } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import Alert from 'antd/es/alert/Alert';

function Notification() {

    const onClose = () => {
        setOpen(false);
    };
    const [open, setOpen] = useState(false);
    const { message, modal, notification } = App.useApp()
    return (
        <>
            <Tooltip title="Notifications" placement='bottomLeft'>
                <Badge dot={true}>
                    <Button icon={<BellOutlined />} onClick={() => setOpen(true)} shape="circle" />
                </Badge>
            </Tooltip>
            <Drawer title="Notifications" placement="right" onClose={onClose} open={open}>
                <Space direction='vertical' style={{ width: '100%' }}>
                    <Divider>Purchases</Divider>
                    <Alert showIcon message={<p>PR <b>#2023-10-23234</b> will expire at 2023-10-25</p>} type='warning' closable />
                    <Alert showIcon message={<p>PR <b>#2023-10-2</b> was delivered and verified</p>} type='success' closable />
                    <Divider>System</Divider>
                    <Alert showIcon message="Unhandle Server Handshake Error" type='error' closable />
                    <Alert showIcon message="Backup Schedule has already pass, be sure to backup you data to prevent data loss" type='warning' closable />
                </Space>
            </Drawer>

        </>
    )
}

export default Notification;