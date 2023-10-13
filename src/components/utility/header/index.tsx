'use client';

import { InfoCircleOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Space, Typography, theme } from "antd";
import Image from 'next/image';
import { memo } from "react";


const UtilityHeader = function () {
    const { token } = theme.useToken()
    const primaryColor = token.colorPrimary
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
            <Button icon={<MenuOutlined />} type='text' onClick={() => alert('no-action TODO')} />
            <Space>
                <Typography.Text style={{ color: primaryColor }}>AUTOPROC</Typography.Text>
                <Image height={24} width={28} src="/logo-small.png" alt="sds" />
                <Typography.Text style={{ color: primaryColor }}>UTILITY APP</Typography.Text>
            </Space>
            <Button type='text' icon={<InfoCircleOutlined />} onClick={() => alert('no-action TODO')} />
        </div>
    )
}

export default memo(UtilityHeader);