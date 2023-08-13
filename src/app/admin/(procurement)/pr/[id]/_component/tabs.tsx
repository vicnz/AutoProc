'use client';

import { CheckCircleOutlined, MenuOutlined, MinusCircleOutlined, ShopOutlined } from '@ant-design/icons';
import { Steps, StepProps, Button, Space, Divider } from 'antd'
import Link from 'next/link';
export default function TabsSection() {
    return (
        <div style={{ padding: '10px', height: 'auto' }}>
            <Space direction='vertical'>
                <Link href="#">
                    <Button icon={<CheckCircleOutlined />} type='text'>Purchase Request</Button>
                </Link>
                <Link href="#">
                    <Button icon={<CheckCircleOutlined />} type='text'>BAC Resolution</Button>
                </Link>
                <Divider plain>Quotation</Divider>
                <Link href="#">
                    <Button icon={<CheckCircleOutlined />} type='text'>Request For Quotation</Button>
                </Link>
                <Link href="#">
                    <Button icon={<MinusCircleOutlined />} type='text'>Abstract Quotation</Button>
                </Link>
                <Divider plain>Awarding</Divider>
                <Link href="#">
                    <Button icon={<MinusCircleOutlined />} type='text'>Notice of Award</Button>
                </Link>
                <Link href="#">
                    <Button icon={<MinusCircleOutlined />} type='text'>BAC Resolution</Button>
                </Link>
                <Divider plain>Release</Divider>
                <Link href="#">
                    <Button icon={<MinusCircleOutlined />} type='text'>Purchase Order</Button>
                </Link>
                <Link href="#">
                    <Button icon={<MinusCircleOutlined />} type='text'>Delivery</Button>
                </Link>
            </Space>
        </div>
    )
}