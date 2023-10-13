"use client";

import { useContext } from "react";
import { ProcurementListContext } from "./pagination";
import TableColumns from "./columns";
import { Result, Table } from "antd";
//constants
//
const ProcurementsTable = function () {
    const { data, error, isLoading } = useContext(ProcurementListContext);

    if (error) {
        return (
            <div style={{ height: "calc(100vh - 112px)" }}>
                <Result
                    status={"500"}
                    title="Network Error"
                    subTitle="Please Try Again Later or Refresh the Page"
                />
            </div>
        );
    }

    return (
        <>
            <Table
                bordered
                sticky
                columns={TableColumns as any}
                dataSource={data}
                pagination={false}
                loading={isLoading}
            />
        </>
    );
};

export default ProcurementsTable;
