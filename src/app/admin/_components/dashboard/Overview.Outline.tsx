'use client';


import { MoneyCollectOutlined, AuditOutlined, TeamOutlined, SolutionOutlined } from "@ant-design/icons"
import { Card, Space, Statistic } from "antd"
import { useEffect, useState } from "react";

const TopShelf = () => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        //emulate loading
        const timer = setTimeout(() => { setLoading(false) }, 2000)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <Space size='middle' wrap>
            <Card size='small' title={<span><MoneyCollectOutlined /> Total Amount</span>} style={{ width: '200px' }}>
                <Statistic title="Total Amount" value={74398} loading={loading}></Statistic>
            </Card>
            <Card size='small' title={<span><AuditOutlined /> Total Items</span>} style={{ width: '200px' }}>
                <Statistic title="Total Amount" value={74398} loading={loading}></Statistic>
            </Card>
            <Card size='small' title={<span><TeamOutlined /> Total Users</span>} style={{ width: '200px' }}>
                <Statistic title="Total Amount" value={74398} loading={loading}></Statistic>
            </Card>
            <Card size='small' title={<span><SolutionOutlined /> Total Suppliers</span>} style={{ width: '200px' }}>
                <Statistic title="Total Amount" value={74398} loading={loading}></Statistic>
            </Card>
            <Card size='small' title={<span><SolutionOutlined /> Total Suppliers</span>} style={{ width: '200px' }}>
                <Statistic title="Total Amount" value={74398} loading={loading}></Statistic>
            </Card>
        </Space>
    )
}

export default TopShelf;