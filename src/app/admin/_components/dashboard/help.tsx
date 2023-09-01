'use client';

import { QuestionCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown, Tooltip } from "antd";
import { useState } from 'react'

const DashboardHelp = () => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <Tooltip title="What Am I Seeing?" placement="left">
                <Button icon={<QuestionCircleOutlined />} onClick={() => setOpen(true)} type='text' />
            </Tooltip>
            <Drawer title="What Am I Seeing?" open={open} onClose={() => setOpen(false)}>
                <p>help section for dashboard help</p>
            </Drawer>
        </>
    )
}

export default DashboardHelp;