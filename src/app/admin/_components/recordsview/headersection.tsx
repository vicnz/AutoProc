'use client';

import { Button, Divider } from 'antd';
import Header from '../shared/header'
import { useRouter } from 'next/navigation'
import { ArrowLeftOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { memo } from 'react'

//components
import Help from './help'

const RecordItemHeader = function ({ title }:
    {
        title: string
    }
) {
    return (
        <Header title={title} back={<ReturnComponent />}>
            <Button icon={<ReloadOutlined />} type='text'>Reload</Button>
            <Divider type='vertical' />
            <Help />
        </Header>
    )
}

//Go Back Route
const ReturnComponent = memo(function GoBack() {
    const router = useRouter()
    return (
        <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
            Back
        </Button>
    )
})

export default RecordItemHeader;