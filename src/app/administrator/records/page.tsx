'use client';

//libs
import { useContext } from 'react';
import { Result, Table } from "antd";
//components
import { RecordTypeContext } from './layout';
import { TableColumns } from './_components/table-definitions';
//configs

//
const Records = function () {
    const { data, isValidating, isLoading, error } = useContext(RecordTypeContext)

    if (error) {
        return (
            <div style={{ height: 'calc(100vh - 112px)' }} >
                <Result status={'500'} title="Network Error" subTitle="Please Try Again Later or Refresh the Page" />
            </div>
        )
    }

    return (
        <>
            <Table bordered sticky columns={TableColumns as any} dataSource={data?.map((item: any) => ({ ...item, key: item.id }))} pagination={false} loading={isLoading || isValidating} />
        </>
    )
}


export default Records;