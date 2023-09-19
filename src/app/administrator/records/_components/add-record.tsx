import { PlusCircleOutlined } from "@ant-design/icons"
import { Button, Drawer, Skeleton } from "antd"
import { useState } from "react"
//components
import dynamic from "next/dynamic"
const AddForm = dynamic(async () => await import('./add-form'), { loading: () => <Skeleton /> })
//configs
//

const AddPr = function () {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button icon={<PlusCircleOutlined />} type='text' onClick={() => setOpen(true)}>Add</Button>
            <Drawer open={open} onClose={() => setOpen(false)} title={"New Purchase Request"} destroyOnClose size='large' extra={<i></i>} maskClosable={false} closable={false}>
                <AddForm close={() => setOpen(false)} />
            </Drawer>
        </>
    )
}

export default AddPr;



