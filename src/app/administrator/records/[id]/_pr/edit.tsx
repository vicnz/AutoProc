import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Drawer, Modal } from "antd";
import { useState } from "react";

const EditForm = function () {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button onClick={() => setOpen(true)} icon={<EditOutlined />} type='primary'>Edit</Button>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                title="Edit"
                extra={
                    <>
                        <Button icon={<SaveOutlined />} type='text' onClick={() => setOpen(false)}>Save</Button>
                    </>
                }
            >

            </Drawer>
        </>
    )
}

export default EditForm;