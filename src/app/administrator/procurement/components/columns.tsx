"use client";

import {
    NumberOutlined,
    UserOutlined,
    ApartmentOutlined,
    FontSizeOutlined,
    BarsOutlined,
    EyeOutlined,
} from "@ant-design/icons";
//
import { Progress, TableColumnsType, Tooltip } from "antd";
//components
import ViewButton from "@components/admin/layouts/procurements/view-button";
//
const TableColumns: TableColumnsType = [
    {
        title: (
            <span>
                <NumberOutlined /> No.
            </span>
        ),
        dataIndex: "number",
        key: "number",
        width: 100,
        ellipsis: true,
    },
    {
        title: (
            <span>
                <NumberOutlined /> Reference
            </span>
        ),
        dataIndex: "reference",
        key: "reference",
        width: 100,
        ellipsis: true,
    },
    {
        title: (
            <span>
                <UserOutlined /> End User
            </span>
        ),
        dataIndex: "enduser",
        key: "enduser",
        width: 100,
        ellipsis: true,
    },
    {
        title: (
            <span>
                <FontSizeOutlined /> Purpose
            </span>
        ),
        dataIndex: "purpose",
        key: "purpose",
        width: 200,
        ellipsis: true,
    },
    {
        title: (
            <span>
                <BarsOutlined /> Particulars
            </span>
        ),
        dataIndex: "particulars",
        key: "particulars",
        ellipsis: true,
        width: 100,
    },
    {
        title: (
            <span>
                <ApartmentOutlined /> Status
            </span>
        ),
        dataIndex: "status",
        key: "status",
        width: 100,
        render: (e: number) => {
            let status = 'normal'
            if (e < 30) {
                status = 'exception'
            }
            if (e > 90 && e <= 100) {
                status = 'success'
            }
            return (
                <span>
                    <Tooltip title={Math.floor(e) + "%"}>
                        <Progress size="small" percent={Math.floor(e)} showInfo={true} status={status as any} strokeColor={Math.floor(e) === 100 ? '#C0252A' : '#38424F'} />
                    </Tooltip>
                </span>
            )
        }
    },
    {
        title: (
            <span>
                <EyeOutlined /> View
            </span>
        ),
        fixed: "right",
        width: 75,
        dataIndex: "id",
        key: "x",
        render: (e: any) => {
            return <ViewButton id={e} />;
        },
    },
];

export default TableColumns;
