"use client";

import { Skeleton, Table } from "antd";
import React, { memo, useMemo } from "react";

function LoadingTable(props: { rows?: number; columns?: number }) {
    const _rows = new Array(props.rows || 5).fill(0);
    const _columns = new Array(props.columns || 8).fill(0);

    const tableColumns = useMemo(() => {
        return _columns.map((item, idx) => {
            return {
                dataIndex: "",
                key: idx,
                title: <Skeleton.Input active size="small" />,
                render: (e: any) => {
                    return <Skeleton.Input active size="small" />;
                },
            };
        });
    }, [_columns]);
    return <Table bordered={false} dataSource={_rows} size="small" pagination={false} columns={tableColumns} />;
}

export default memo(LoadingTable);
