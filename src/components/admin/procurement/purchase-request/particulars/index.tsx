"use client";

import { memo } from "react";
import { Table } from "antd";
import Columns from "./columns";
import renderSummary from "./summary";


//types
type IParticulars = {
    qty: number,
    unit: string,
    description: string,
    stock: string,
    price: number,
    total: number
}
interface DataTableProps {
    data: IParticulars[];
}
//
const DataTable = function (props: DataTableProps) {
    return (
        <Table
            bordered
            columns={Columns as any}
            dataSource={props.data}
            style={{ padding: "5px 25px" }}
            pagination={false}
            summary={renderSummary as any}
        />
    );
};

export default memo(DataTable)
