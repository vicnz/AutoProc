import { PlusCircleOutlined } from "@ant-design/icons"
import { Result, Button, App } from "antd"
import { memo, useState } from "react"
import { mutate } from "swr"

const { useApp } = App
const AddNewDocument = function (props: { data: any, id: string }) {
    const { message } = useApp()
    const [loading, setLoading] = useState(false)
    return (
        <Result
            status='404'
            title="No Document"
            subTitle={`Not yet assigned a BAC-Resolution for Recommendation`}
            extra={(
                <Button
                    loading={loading}
                    icon={<PlusCircleOutlined />}
                    type='text'
                    onClick={async () => {
                        setLoading(true)
                        let result = await fetch(`/administrator/api/records/recommendation?_id=${props.id}`, { method: 'POST' })
                        if (result.ok) {
                            message.success(`Added New BAC Resolution`)
                            setLoading(false)
                            mutate(`/administrator/api/records/recommendation?_id=${props.id}`)
                        } else {
                            setLoading(false)
                            message.error("Something Wrong Please Try Again")
                        }
                    }}
                >
                    Create New Document
                </Button>
            )}
        />
    )
}

export default memo(AddNewDocument)