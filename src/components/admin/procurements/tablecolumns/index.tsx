'use client';

import { NumberOutlined, UserOutlined, ApartmentOutlined, FontSizeOutlined, BarsOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, TableColumnsType } from "antd";
import NextLink from 'next/link';

const TableColumns: TableColumnsType = [
    {
        title: <span><NumberOutlined /> No.</span>,
        dataIndex: "pr_no",
        key: "pr_no",
        width: 100,
        ellipsis: true,
    },
    {
        title: <span><NumberOutlined /> Reference</span>,
        dataIndex: "reference",
        key: "reference",
        width: 100,
        ellipsis: true
    },
    {
        title: <span><UserOutlined /> End User</span>,
        dataIndex: "enduser",
        key: "enduser",
        width: 100,
        ellipsis: true,
    },
    {
        title: <span><ApartmentOutlined /> Department</span>,
        dataIndex: "department",
        key: "department",
        width: 100,
        ellipsis: true
    },
    {
        title: <span><ApartmentOutlined /> Section</span>,
        dataIndex: "section",
        key: "section",
        width: 100,
        ellipsis: true
    },
    {
        title: <span><FontSizeOutlined /> Purpose</span>,
        dataIndex: "purpose",
        key: "purpose",
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
        title: <span><EyeOutlined /> View</span>,
        fixed: 'right',
        width: 75,
        dataIndex: 'id',
        key: 'x',
        render: (e: any) => {
            return (
                <NextLink href={`/administrator/records/${e}`} passHref>
                    <Button icon={<EyeOutlined />} type='text'>View</Button>
                </NextLink>
            )
        },
    },
]

export default TableColumns