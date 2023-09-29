import { DeleteOutlined, EditOutlined, LockOutlined, MinusCircleOutlined, SaveOutlined, SecurityScanFilled, WarningOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Drawer, Popconfirm, Skeleton, Space, Switch } from "antd";
import { useState } from "react";

import useSWR, { mutate } from "swr";
import SetFinal from './set-final'
import dynamic from "next/dynamic";
const Form = dynamic(async () => await import('./form'), { loading: () => <Skeleton active /> })
import { IAPIReturnType } from './types'

const EditForm = function (props: { data: IAPIReturnType }) {
    const [open, setOpen] = useState(false)
    const { data: endusers, error, isLoading, isValidating } = useSWR('/administrator/api/user?reqtype=selection', (...params) => fetch(...params).then(res => res.json())) //change this in api routes

    const onClose = async function () {
        await mutate(`/administrator/api/records/pr?_id=${props.data?.id}`)
        setOpen(false)
    }
    return (
        <>
            <Button onClick={() => setOpen(true)} icon={<EditOutlined />} type='primary' disabled={props.data?.final}>Edit</Button>
            <Drawer
                destroyOnClose
                size="large"
                open={open}
                onClose={onClose}
                title="Edit Purchase Request"
                extra={
                    <Space>
                        <SetFinal id={props?.data.id} final={props.data.final} close={() => setOpen(false)} />
                        <Button icon={<DeleteOutlined />} danger type='primary' disabled={props.data?.final} title="TODO">Delete</Button>
                    </Space>
                }
            >
                {
                    !endusers ? <Skeleton /> :
                        <Form data={props.data} close={() => onClose()} users={endusers} />
                }
            </Drawer>
        </>
    )
}


export default EditForm;