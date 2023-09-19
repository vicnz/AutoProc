'use client';

import { NumberOutlined, UserOutlined, ApartmentOutlined, FontSizeOutlined, BarsOutlined, MoneyCollectOutlined, EditOutlined } from "@ant-design/icons";
import { Button, TableColumnsType, Typography } from "antd";
import NextLink from 'next/link';

const { Link } = Typography
export const TableColumns: TableColumnsType = [
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
                <NextLink href={`/administrator/records/${e.key}`} passHref>
                    <Button icon={<EditOutlined />}>Edit</Button>
                </NextLink>
            )
        },
    },
]