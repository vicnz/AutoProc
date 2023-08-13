'use client';

import dynamic from "next/dynamic";
import { Space, Statistic, SpaceProps, Card, Divider, Row, Col } from "antd";
import StepTest from "./step.test";

const ChartTest = dynamic(() => import('./chart.test'), { ssr: false })

export default function OverviewTab() {
    return (
        <div style={{ padding: '15px' }}>
            <Space wrap size='large'>
                {
                    new Array(5).fill(0).map((item, idx) => {
                        return (
                            <Card key={idx} style={{ background: 'linear-gradient( -45deg, #C0252A45, #C0252A25)' }}>
                                <Statistic title='Statistics' value={Math.floor(Math.random() * 1000000)} />
                            </Card>
                        )
                    })
                }
            </Space>
            <Divider />
            <Card >
                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 50vw', gap: '10px' }}>
                    <StepTest />
                    <Divider type='vertical' style={{ height: '100%' }} />
                    <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '15px' }}>
                        <ChartTest />
                        <ChartTest type="pie" />
                    </div>
                </div>
            </Card>
        </div>
    )
}