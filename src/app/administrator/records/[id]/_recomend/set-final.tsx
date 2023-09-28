import { WarningOutlined, LockOutlined } from "@ant-design/icons"
import { Alert, Popconfirm, Button, App, Switch, Popover } from "antd"
import { memo, useState } from "react"

const { useApp } = App
const MarkedFinal = function (props: { id: string, final: boolean }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { message } = useApp()

    const setFinal = async () => {
        setLoading(true)
        setOpen(true)
        const data = await fetch(`/administrator/api/records/recommendation?_id=${props.id}&_reqtype=${true}`, { method: 'PUT' })

        if (data.ok) {
            message.info('Purchase Request, Marked as Completed!')
            setOpen(false)
            setLoading(false)
        } else {
            message.error('Failed, Network Error, Please Try Again')
            setLoading(false)
            setOpen(false)
        }
    }

    let content = (
        <div style={{ width: 200 }}>
            <span>Mark the document as final and completed, no other changes will be expected and this will allow the creation of the next document type</span>
        </div>
    )
    return (
        <Popover content={content} title="Mark As Final" trigger={'hover'}>
            <Switch checked={props.final} onChange={(e: boolean) => setFinal()} loading={loading} checkedChildren={"Approved"} unCheckedChildren={"Pending"} disabled={props.final} />
        </Popover>
    )
}

export default memo(MarkedFinal);