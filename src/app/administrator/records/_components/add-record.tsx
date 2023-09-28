import { PlusCircleOutlined } from "@ant-design/icons"
import { Button, Drawer, Skeleton } from "antd"
import { useState } from "react"
//components
import dynamic from "next/dynamic"
import useSWR, { mutate } from "swr"
const AddForm = dynamic(async () => await import('./add-form'))
//configs
//

const AddPr = function () {
    const [open, setOpen] = useState(false)
    const { data, error, isLoading, isValidating } = useSWR('/administrator/api/user?reqtype=selection', (...params) => fetch(...params).then(res => res.json()))

    const onClose = () => {
        mutate('/administrator/api/records')
        setOpen(false)
    }
    return (
        <>
            <Button icon={<PlusCircleOutlined />} type='text' onClick={() => setOpen(true)}>Add</Button>
            <Drawer open={open} onClose={onClose} title={"New Purchase Request"} destroyOnClose size='large' extra={<i style={{ fontSize: ".8em" }}>from admin</i>} closable={true}>
                {
                    !data ?
                        <Skeleton /> :
                        <AddForm close={() => setOpen(false)} users={data} />
                }
            </Drawer>
        </>
    )
}

export default AddPr;



