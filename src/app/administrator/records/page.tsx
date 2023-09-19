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
                <Result
                    status={'error'}
                    title="Unable to Fetch Data"
                    subTitle="Server Response Error"
                />
            </div>
        )
    }

    return (
        <>
            <Table bordered sticky columns={TableColumns as any} dataSource={data} pagination={false} loading={isLoading || isValidating} />
        </>
    )
}


export default Records;