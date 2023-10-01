import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Button, Drawer, Result, Skeleton } from "antd"
import { useState } from "react"
//components
import dynamic from "next/dynamic"
import useSWR, { mutate } from "swr"
const AddForm = dynamic(async () => await import('./form'), { loading: () => <Skeleton active /> })
//configs
//

const AddNewPurchaseRequest = function (props: { prId?: string, type: 'add' | 'edit' }) {
    const [open, setOpen] = useState(false)
    const { data, error, isLoading, isValidating } = useSWR('/administrator/api/user?reqtype=selection', (...params) => fetch(...params).then(res => res.json())) //remove this

    const onClose = () => {
        mutate('/administrator/api/records')
        setOpen(false)
    }

    return (
        <>
            {
                (props.type === 'add' && typeof props.prId === 'undefined') ?
                    <Button icon={<PlusCircleOutlined />} type='text' onClick={() => setOpen(true)}>Add</Button> :
                    <Button icon={<EditOutlined />} type='text' onClick={() => setOpen(true)}>Edit</Button>
            }
            <Drawer open={open} onClose={onClose} title={(props.type === 'add' && typeof props.prId === 'undefined') ? 'Add PR' : 'Edit PR'} destroyOnClose size='large' extra={<i style={{ fontSize: ".8em" }}>from admin</i>} closable={true}>
                {
                    (props.type === 'add' && typeof props.prId === 'undefined') ?
                        <AddForm users={data} close={() => setOpen(false)} /> :
                        <AddFormWithData close={setOpen} id={props?.prId as string} />
                }
            </Drawer>
        </>
    )
}

const AddFormWithData = function (props: { id: string, close: any }) {
    const { data, error, isLoading, isValidating } = useSWR(`/administrator/procurements/${props.id}/api`, (...params) => fetch(...params).then(res => res.json()))

    if (error) {
        return (<Result status={'error'} />)
    } else {
        return (
            <>
                {
                    (!data || isLoading) ?
                        <Skeleton active /> :
                        <AddForm users={[]} data={data} close={() => props.close(false)} />
                }
            </>
        )
    }
}

export default AddNewPurchaseRequest;



