'use client';

import { Card, Skeleton, Space } from "antd"
import dynamic from "next/dynamic";
const RatingSummary = dynamic(async () => await import('./Rating.Summary'), { ssr: false, loading: () => <div style={{ padding: '15px' }}><Skeleton paragraph /></div> })
const RatingDescription = dynamic(async () => await import('./Rating.Content'), { ssr: false, loading: () => <div style={{ padding: '15px' }}><Skeleton paragraph /></div> })
const Rating = function () {
    return (
        <Space style={{ width: '100%', paddingRight: '25px' }} direction="vertical">
            <div></div>
            <Card title="Supplier Rating" style={{ width: 'inherit' }}>
                <RatingSummary />
            </Card>
            <Card style={{ width: 'inherit' }}>
                <RatingDescription />
            </Card>
            <div></div>
        </Space>
    )
}

export default Rating;