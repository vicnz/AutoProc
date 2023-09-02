'use client';

import { Card, Skeleton, Space } from "antd"
import dynamic from "next/dynamic";
const Graph = dynamic(async () => await import('./rating.graph'), { ssr: false, loading: () => <div style={{ padding: '15px' }}><Skeleton paragraph /></div> })
const Summary = dynamic(async () => await import('./rating.summary'), { ssr: false, loading: () => <div style={{ padding: '15px' }}><Skeleton paragraph /></div> })
const Rating = function () {
    return (
        <Space style={{ width: '100%', paddingRight: '25px' }} direction="vertical">
            <div></div>
            <Card title="Supplier Rating" style={{ width: 'inherit' }}>
                <Graph />
            </Card>
            <Card style={{ width: 'inherit' }}>
                <Summary />
            </Card>
            <div></div>
        </Space>
    )
}

export default Rating;