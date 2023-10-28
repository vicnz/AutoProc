'use client';

import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Drawer, Result, Skeleton } from "antd";
import dynamic from "next/dynamic";
import { PropsWithChildren, useState } from "react";
import useSWR from "swr";

const UserCrudForm = dynamic(async () => await import('./form'), { loading: () => <Skeleton active /> })
type UserCrudProps = {
    isEdit: boolean,
    id?: string,
}
const UserCrud = (props: PropsWithChildren<UserCrudProps>) => {
    const { isEdit, id } = props
    const [open, setOpen] = useState(false)
    const content = isEdit ? "Edit User" : "Add New User"
    return (
        <>
            <Button onClick={() => setOpen(true)} type='text' icon={isEdit ? <UserOutlined /> : <UserAddOutlined />}>
                {content}
            </Button>
            <Drawer open={open} onClose={() => setOpen(false)} title={content}>
                <Skeleton active />
            </Drawer>
        </>
    )
}

const PreloadWithData = (props: { id: string }) => {
    const { data, isLoading, error } = useSWR(`/administrator/api/users?user=true&${encodeURIComponent(props.id)}`)
    if (error) {
        return <Result status="error" title="Network Error" subTitle="Please Try Again" />
    }
    if (!data || isLoading) {
        return <Skeleton active />
    }
    return (
        <>
        </>
    )
}

export default UserCrud;