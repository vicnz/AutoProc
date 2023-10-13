'use client';
//lib
import { Card, Space, Statistic } from "antd";
import { Chart as ChartJs, registerables } from 'chart.js'
import { useEffect } from "react";
//components
//config
const Services = [
    { label: 'Number of End Users', value: 78 },
    { label: 'Number of Suppliers Users', value: 29 },
    { label: 'Total Procured Cost', value: Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP', }).format(3554546.89) },
    { label: 'Fiscal Year Procurement Cost', value: Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP', }).format(2322.23) }
]
//states
//
const Overview = function () {
    useEffect(() => {
        ChartJs.register(...registerables)
    }, [])

    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }}>
                <div></div>
                <Outline />
            </Space>
        </>
    )
}


const Outline = function () {
    return (
        <>
            <Space wrap>
                {
                    Services.map(item => {
                        return (
                            <Card key={item.value} style={{ minWidth: 150 }}>
                                <Statistic title={<span style={{ textTransform: 'capitalize' }}>{item.label}</span>} value={item.value} />
                            </Card>
                        )
                    })
                }
            </Space>
        </>
    )
}

const OverviewGraph = function () {
    return (
        <>
        </>
    )
}

export default Overview;