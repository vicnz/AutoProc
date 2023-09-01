'use client';

import { Button, Divider, Space } from 'antd';
import Header from '../shared/header'
import { FundProjectionScreenOutlined, MoreOutlined, ReloadOutlined } from '@ant-design/icons';
import Help from './help'

const DashboardHeader = (props: { title: string }) => {
    return (
        <Header title={props.title}>
            <Space>
                <Button icon={<ReloadOutlined />} type='text'>Reload</Button>
                <Button icon={<FundProjectionScreenOutlined />} type='text'>Generate Report</Button>
                <Divider type='vertical' />
                <Help />
            </Space>
        </Header>
    )
}

export default DashboardHeader;