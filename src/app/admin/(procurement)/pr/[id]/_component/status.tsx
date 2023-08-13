'use client'


import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons'
import { StepProps, Steps, Timeline, TimelineItemProps, Collapse, Button } from 'antd'


const TimelineItem: TimelineItemProps[] = [
    {
        color: 'green',
        children: "Office of the Budget"
    },
    {
        color: 'green',
        children: "Office of the Procurement Officer"
    },
    {
        color: 'green',
        children: "Office of the President",
    },
    {
        pending: true,
        color: 'gray',
        children: "Office of the Procurement Officer"
    },
]
const SampleTimeline = () => {
    return (
        <>
            <Timeline items={TimelineItem} />
        </>
    )
}

//

const Items: StepProps[] = [
    {
        title: "Purchase Request",
        subTitle: <Button icon={<ArrowRightOutlined />} size='small' type='text'></Button>,
        description: "Approved",
        status: 'finish',
    },
    {
        status: 'finish',
        title: "BAC Resolution",
        subTitle: <Button icon={<ArrowRightOutlined />} size='small' type='text'></Button>,
        description: "Approved"
    },
    {
        status: 'finish',
        title: "Request for Quotation",
        subTitle: <Button icon={<ArrowRightOutlined />} size='small' type='text'></Button>,
        description: "Approved"
    },
    {
        status: 'process',
        title: "Abstract of Quotation",
        subTitle: <Button icon={<ArrowRightOutlined />} size='small' type='text'></Button>,
        description: (<div style={{ paddingTop: 's10px' }}>
            <SampleTimeline />
        </div>)
    },
    {
        title: "Notice of Award",
        subTitle: <Button icon={<ArrowRightOutlined />} size='small' type='text' disabled></Button>,
        description: "Pending"
    },
    {
        title: "BAC Resolution",
        subTitle: <Button icon={<ArrowRightOutlined />} size='small' type='text' disabled></Button>,
        description: "Pending"
    },
    {
        title: "Purchase Order",
        subTitle: <Button icon={<ArrowRightOutlined />} size='small' type='text' disabled></Button>,
        description: "Pending"
    },
    {
        title: "Delivery",
        subTitle: <Button icon={<ArrowRightOutlined />} size='small' type='text' disabled></Button>,
        description: "Pending"
    },
]

export default function StepNavigation() {
    return (
        <div style={{ padding: '15px', textAlign: 'center' }}>
            <Steps direction='vertical' items={Items} />
        </div>
    )
}

