'use client';

import { Table, TableColumnsType } from "antd";
import { memo } from "react";

const Columns: TableColumnsType = [
    {
        title: "Signature",
        key: "signaturee",
        dataIndex: "",
        render: (e: any) => {
            return <div style={{ height: 25 }}></div>;
        },
    },
    {
        title: "Office & Section",
        key: "ofc&sec",
        dataIndex: "",
        render: (e: any) => {
            return <div style={{ height: 25 }}></div>;
        },
    },
    {
        title: "Type of Document",
        key: "tpDocument",
        dataIndex: "",
        render: (e: any) => {
            return <div style={{ height: 25 }}></div>;
        },
    },
    {
        title: "In?",
        key: "isIn",
        dataIndex: "",
        width: 50,
        render: (e: any) => {
            return <div style={{ height: 25 }}></div>;
        },
    },
    {
        title: "Out?",
        key: "isOut",
        dataIndex: "",
        width: 50,
        render: (e: any) => {
            return <div style={{ height: 25 }}></div>;
        },
    },
    {
        title: "Date",
        key: "date",
        dataIndex: "",
        render: (e: any) => {
            return <div style={{ height: 25 }}></div>;
        },
    },
    {
        title: "Time",
        key: "time",
        dataIndex: "",
        render: (e: any) => {
            return <div style={{ height: 25 }}></div>;
        },
    },
];

const RenderTable = memo(function AltTracking() {
    const dataSets = new Array(20).fill(0);
    return (
        <Table
            caption={
                <p style={{ textAlign: "center", padding: "5px 0" }}>MANUAL TRACKING</p>
            }
            dataSource={dataSets.map((item, idx) => ({ key: idx })) as any}
            columns={Columns as any}
            pagination={false}
            size="small"
            bordered
            style={{ margin: 0, padding: 0, borderRadius: 0 }}
        />
    );
});

export default RenderTable;