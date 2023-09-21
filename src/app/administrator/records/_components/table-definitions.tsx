'use client';

import { NumberOutlined, UserOutlined, ApartmentOutlined, FontSizeOutlined, BarsOutlined, MoneyCollectOutlined, EditOutlined } from "@ant-design/icons";
import { Button, TableColumnsType, Typography } from "antd";
import NextLink from 'next/link';

const { Link } = Typography
export const TableColumns: TableColumnsType = [
    {
        title: <span><NumberOutlined /> No.</span>,
        dataIndex: "pr_no",
        key: "number",
        width: 100,
        ellipsis: true,
    },
    {
        title: <span><NumberOutlined /> Reference</span>,
        dataIndex: "reference",
        key: "number",
        width: 100,
        ellipsis: true
    },
    {
        title: <span><UserOutlined /> End User</span>,
        dataIndex: "enduser",
        key: "string",
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
        ellipsis: true,
        width: 100
    },
    {
        title: 'View',
        fixed: 'right',
        width: 75,
        dataIndex: 'id',
        key: 'x',
        render: (e: any) => {
            console.log(e)
            return (
                <NextLink href={`/administrator/records/${e}`} passHref>
                    <Button icon={<EditOutlined />} type='text'>View</Button>
                </NextLink>
            )
        },
    },
]