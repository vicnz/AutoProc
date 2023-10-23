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
import ViewButton from "./view-button";
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
        render: (e: any[]) => {
            const count = e.length;
            const countAccumelate = e.reduce((prev, curr) => {
                let isTrue = curr === true ? 1 : 0
                return prev + isTrue;
            }, 0)

            const average = (countAccumelate / count) * 100
            let status = 'normal'
            if (average < 30) {
                status = 'exception'
            }
            if (average > 90 && average <= 100) {
                status = 'success'
            }
            return (
                <span>
                    <Tooltip title={Math.floor(average) + "%"}>
                        <Progress size="small" percent={average} showInfo={false} status={status as any} strokeColor={Math.floor(average) === 100 ? '#C0252A' : '#38424F'} />
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
