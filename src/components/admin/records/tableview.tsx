'use client';
import { ApartmentOutlined, BarsOutlined, FolderOpenOutlined, FontSizeOutlined, MoneyCollectOutlined, NumberOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Result, Skeleton, Table, TableColumnsType } from 'antd';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';

//mock data
import MockData from '../../../../.tests/mockdata/pr'

const TableColumns: TableColumnsType = [
    {
        title: <span><NumberOutlined /> PR No.</span>,
        dataIndex: "number",
        key: "number",
        width: 100,
        ellipsis: true,
        fixed: 'left'
    },
    {
        title: <span><NumberOutlined /> Ref No.</span>,
        dataIndex: "reference",
        key: "number",
        width: 100,
        ellipsis: true
    },
    {
        title: <span><UserOutlined /> Client</span>,
        dataIndex: "client",
        key: "number",
        width: 100,
        ellipsis: true,
    },
    {
        title: <span><ApartmentOutlined /> Department</span>,
        dataIndex: "department",
        key: "number",
        width: 100,
        ellipsis: true
    },
    {
        title: <span><ApartmentOutlined /> Section</span>,
        dataIndex: "section",
        key: "number",
        width: 100,
        ellipsis: true
    },
    {
        title: <span><FontSizeOutlined /> Purpose</span>,
        dataIndex: "purpose",
        key: "number",
        width: 200,
        ellipsis: true
    },
    {
        title: <span><BarsOutlined /> Particulars</span>,
        dataIndex: "particulars",
        key: "particulars",
        width: 100,
        ellipsis: true
    },
    {
        title: <span><MoneyCollectOutlined /> Total</span>,
        dataIndex: "total",
        key: "total",
        width: 100,
        ellipsis: true
    },
    {
        title: 'View',
        fixed: 'right',
        width: 75,
        dataIndex: '',
        key: 'x',
        render: (e: any) => {
            return (
                <ViewItem key={e?.key} />
            )
        },
    },
]

const TableView = function () {
    return <Table columns={TableColumns as any} dataSource={MockData} sticky pagination={false} />
}

const ViewItem = function ({ key }: { key: string }) {
    const [pending, setPending] = useState(false)

    useEffect(() => {
        return () => setPending(false)
    }, [])

    return (
        <Link href={`records/${key}`}>
            <Button icon={<FolderOpenOutlined />} type="text" onClick={() => setPending(true)} loading={pending}>View</Button>
        </Link>
    )
}

export default TableView;