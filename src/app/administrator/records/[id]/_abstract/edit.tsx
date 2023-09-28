import { EditOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useState } from "react";
//components
import Form from './form';
import SetFinal from './set-final'
//config
//
const EditForm = function (props: { data: any }) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button onClick={() => setOpen(true)} icon={<EditOutlined />} type='primary' disabled={props.data.final}>Edit</Button>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                title="Edit"
                destroyOnClose
                extra={
                    <>
                        <SetFinal id={props.data.id} />
                    </>
                }
            >
                <Form data={props.data} close={() => setOpen(false)} />
            </Drawer>
        </>
    )
}

export default EditForm;