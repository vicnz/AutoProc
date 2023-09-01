'use client';

import { Button, Divider, Space } from 'antd';
import Header from '../shared/header'
import { ArrowLeftOutlined, ArrowRightOutlined, FileAddOutlined, MoreOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import Help from './help'

const RecordsHeader = (props: { title: string }) => {
    return (
        <Header title={props.title}>
            <Space>
                <Button icon={<ArrowLeftOutlined />} type='text'>Prev</Button>
                <div>1</div>
                <Button icon={<ArrowRightOutlined />} type='text'>Next</Button>
                <Divider type='vertical' />
                <Button icon={<PlusCircleOutlined />} type='text'>Add</Button>
                <Button icon={<FileAddOutlined />} type='text'>Requests</Button>
                <Divider type='vertical' />
                <Help />
            </Space>
        </Header>
    )
}

export default RecordsHeader;