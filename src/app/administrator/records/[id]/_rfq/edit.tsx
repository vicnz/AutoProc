'use client';
//lib
import { EditOutlined } from "@ant-design/icons";
import { Button, Drawer, Result, Skeleton } from "antd";
import { memo, useState } from "react";
import useSWR, { mutate } from "swr";
//components
import FormEdit from './form';
import MarkAsFinal from './set-final'
//configs
//

const EditForm = function (props: { rfqData: any }) {
    const [open, setOpen] = useState(false)
    const { data, isLoading, error } = useSWR('/administrator/api/suppliers', (...props) => fetch(...props).then(res => res.json()))
    return (
        <>
            <Button onClick={() => setOpen(true)} icon={<EditOutlined />} type='primary' disabled={props.rfqData.final}>Edit</Button>
            <Drawer
                open={open}
                onClose={() => {
                    setOpen(false)
                    mutate(`/administrator/api/records/rfq?_id=${data.id}`)
                }}
                title="Edit"
                destroyOnClose
                extra={
                    <>
                        <MarkAsFinal id={props.rfqData.id} />
                    </>
                }
            >
                {
                    error ?
                        <>
                            <Result status="error" title="Unable To Load Data" />
                        </>
                        :
                        <>
                            {
                                (!data || isLoading) ?
                                    <Skeleton active /> :
                                    <FormEdit data={props.rfqData} suppliers={data} close={() => setOpen(false)} />
                            }
                        </>
                }
            </Drawer>
        </>
    )
}

export default memo(EditForm);