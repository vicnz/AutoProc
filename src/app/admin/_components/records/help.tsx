'use client';

import { QuestionCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown } from "antd";
import { useState } from 'react'

const DashboardHelp = () => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <Button icon={<QuestionCircleOutlined />} onClick={() => setOpen(true)} type='text' />
            <Drawer title="How To?" open={open} onClose={() => setOpen(false)}>
                <p>help section for Records help</p>
            </Drawer>
        </>
    )
}

export default DashboardHelp;