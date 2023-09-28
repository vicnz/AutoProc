import { DeleteOutlined, EditOutlined, LockOutlined, MinusCircleOutlined, SaveOutlined, SecurityScanFilled, WarningOutlined } from "@ant-design/icons";
import { Alert, Button, Drawer, Popconfirm, Skeleton, Space, Switch } from "antd";
import { useState } from "react";

import useSWR, { mutate } from "swr";
import SetFinal from './set-final'
import dynamic from "next/dynamic";
const Form = dynamic(async () => await import('./form'), { loading: () => <Skeleton active /> })

const EditForm = function (props: { data: any }) {
    const [open, setOpen] = useState(false)
    const { data, error, isLoading, isValidating } = useSWR('/administrator/api/user?reqtype=selection', (...params) => fetch(...params).then(res => res.json()))

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
                        <SetFinal id={props?.data.id} />
                        <Button icon={<DeleteOutlined />} danger type='primary' disabled={data?.final}>Delete</Button>
                    </Space>
                }
            >
                {
                    !data ? <Skeleton /> :
                        <Form data={props.data} close={() => onClose()} users={data} />
                }
            </Drawer>
        </>
    )
}


export default EditForm;