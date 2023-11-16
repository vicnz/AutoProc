"use client";

import { Badge, Table, TableColumnsType, Tag } from "antd";
import { useMemo } from "react";
import Edit from "./edit";
import {
    BlockOutlined,
    BranchesOutlined,
    BuildOutlined,
    FileDoneOutlined,
    FileOutlined,
    FolderOpenOutlined,
    FolderOutlined,
    SlackSquareOutlined,
} from "@ant-design/icons";

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
    const columns = useMemo<TableColumnsType>(() => {
        return [
            {
                title: "Name",
                dataIndex: "",
                key: "name",
                ellipsis: true,
                width: 175,
                render: (e) => {
                    if (e.type === "section") {
                        return (
                            <span>
                                <FileOutlined />
                                &nbsp; {e.name}
                            </span>
                        );
                    }
                    return (
                        <span>
                            <FolderOutlined />
                            &nbsp; {e.name}
                        </span>
                    );
                },
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
    }, []);

    return <Table dataSource={props.data} columns={columns as any} pagination={false} sticky />;
}

export default RenderTable;
