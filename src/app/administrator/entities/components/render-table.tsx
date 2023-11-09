"use client";

import { EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useMemo } from "react";
import Edit from "./edit";

type DataType = {
    id: string;
    description: string | null;
    name: string;
    key: string;
};

type DataTypes = Array<{
    id: string;
    description: string | null;
    name: string;
    key: string;
    children?: DataType[];
}>;

function RenderTable(props: { data: DataTypes }) {
    const columns = useMemo(() => {
        const deptInfo = props.data.map((item) => ({ label: item.description, value: item.id }));
        return [
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                ellipsis: true,
                width: 150,
            },
            {
                title: "Description",
                dataIndex: "description",
                key: "name",
                ellipsis: true,
            },
            {
                title: "Edit",
                dataIndex: "",
                key: "edit",
                width: 75,
                render: (e: any) => {
                    return <Edit data={e as any} type={e?.type} />;
                },
            },
        ];
    }, [props.data]);

    return <Table dataSource={props.data} columns={columns as any} pagination={false} sticky />;
}

export default RenderTable;
