'use client';
//lib
import { Card, Result, Space, Statistic, Spin, Skeleton } from "antd";
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
import useDashboardData, { ReqType } from '../../administrator/preload'
//
const Overview = function () {
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
    const { data, error, isLoading } = useDashboardData(ReqType.OUTLINE)
    if (error) {
        return (
            <Result status={"error"} />
        )
    } else {
        return (
            <>
                {
                    (isLoading === true) ?
                        <Skeleton paragraph={{ rows: 4 }} />
                        :
                        <Space wrap>
                            {
                                data?.data.map((item: { name: string, description: string, value: any }, idx: number) => {
                                    return (
                                        <Card key={idx} style={{ minWidth: '150px' }}>
                                            <Statistic
                                                title={<span style={{ textTransform: 'capitalize' }}>{item.name}</span>}
                                                value={item.value}
                                            />
                                        </Card>
                                    )
                                })
                            }
                        </Space>
                }
            </>
        )
    }
}

const OverviewGraph = function () {
    return (
        <>
        </>
    )
}

export default Overview;