"use client";

/**
 * * VIEW PROCUREMENTS
 */

import { memo, useContext } from "react";
import { Table } from "antd";
//components
import TableColumns from "@components/admin/layouts/procurements/columns";
import { ProcurementListContext } from "@components/admin/layouts/procurements/layout";
import NetworkError from '@components/network-error'
//
const ProcurementsTable = function () {
    const { data, error, isLoading } = useContext(ProcurementListContext);

    if (error) {
        return (
            <div style={{ height: "calc(100vh - 112px)" }}>
                <NetworkError title="Network Error" subTitle="Please Reload Page" />
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

export default memo(ProcurementsTable);
