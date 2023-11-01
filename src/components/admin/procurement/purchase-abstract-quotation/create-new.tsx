import { PlusCircleOutlined } from "@ant-design/icons";
import { App, Button, Result } from "antd";
import { CSSProperties, useState } from "react";
import { usePRId } from "@components/admin/pr-number";

const WrapperStyles: CSSProperties = {
    height: 'calc(100vh - 112px)',
    width: '100%',
}

const CreateNewAbstract = function () {
    const prID = usePRId()
    const { message } = App.useApp()
    const [loading, setLoading] = useState(false)
    const addnew = async function () {
        setLoading(true)
        //add new abstract document
        const response = await fetch(`/administrator/api/procurement/abstract?_id=${encodeURIComponent(prID)}`, {
            method: 'POST'
        })
        if (response.ok) {
            setLoading(false)
            message.info('Created New Abstract Quotation Document')
        } else {
            setLoading(false)
            message.error('Oops an Error Occured!')
        }
    }

    return (
        <div style={WrapperStyles}>
            <Result
                status="404"
                title="No Abstract Document"
                subTitle="Create New Abstract Quotation Document"
                extra={
                    <>
                        <Button icon={<PlusCircleOutlined />} loading={loading} onClick={() => addnew()}>Create New Abstract Quotation</Button>
                    </>
                }
            />
        </div>
    );
}

export default CreateNewAbstract;