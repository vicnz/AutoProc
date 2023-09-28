import { WarningOutlined, LockOutlined } from "@ant-design/icons"
import { Alert, Popconfirm, Button, App } from "antd"
import { memo, useState } from "react"

const { useApp } = App
const MarkedFinal = function (props: { id: string, final: boolean, close: any }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { message } = useApp()

    const setFinal = async () => {
        setLoading(true)
        setOpen(true)
        const data = await fetch(`/administrator/api/records/pr?_id=${props.id}&_reqtype=${true}`, { method: 'PUT' })

        if (data.ok) {
            message.info('Purchase Request, Marked as Completed!')
            setOpen(false)
            setLoading(false)
        } else {
            message.error('Failed, Network Error, Please Try Again')
            setLoading(false)
            setOpen(false)
        }

        props.close()
    }

    let content = (
        <div style={{ width: 200 }}>
            <span>Mark the document as final and completed, no other changes will be expected and this will allow the creation of the next document type</span>
            <br />
            <br />
            <Alert banner icon={<WarningOutlined />} description="Once a document as marked as final, it cannot be modified" type="error" style={{ padding: 10 }} />
        </div>
    )
    return (
        <Popconfirm title={'Mark as Final'} description={content} placement="bottomLeft" open={open} onConfirm={setFinal} onCancel={() => setOpen(false)} okText="Make Final" destroyTooltipOnHide>
            <Button icon={<LockOutlined />} onClick={() => setOpen(true)} loading={loading} disabled={props.final}>Mark as Final</Button>
        </Popconfirm>
    )
}

export default memo(MarkedFinal);