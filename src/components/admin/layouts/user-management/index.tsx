'use client';
import { useContext } from 'react'
import { PaginationContextWrapper } from './layout'
import { Table } from 'antd';
import Columns from './columns'


const UserManagement = function () {
    const { isLoading, data } = useContext(PaginationContextWrapper)
    return (
        <Table
            columns={Columns as any}
            loading={isLoading}
            dataSource={data}
            pagination={false}
            bordered
        />
    )
}

export default UserManagement;