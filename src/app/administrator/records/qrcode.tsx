'use client';

//libs
import { PrinterOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Button, Descriptions, Modal, QRCode, Result, Skeleton, Table, TableColumnsType, Divider } from "antd";
import { memo, useRef, useState } from "react";
import useSWR from "swr";
import { useReactToPrint } from 'react-to-print';
//components
//configs
const printQRCode = function (props: { id: string }) {
    const qrPrintRef = useRef(null)
    const { data, isLoading, error } = useSWR(`/administrator/api/records/pr?_id=${props.id}`, (...params) => fetch(...params).then(res => res.json()))
    const [open, setOpen] = useState(false)

    const handlePrint = useReactToPrint({
        content: () => qrPrintRef.current
    })

    return (
        <>
            <Button type='text' icon={<QrcodeOutlined />} onClick={() => setOpen(true)}>Tracking</Button>
            <Modal open={open} onCancel={() => setOpen(false)} onOk={() => setOpen(false)} centered title="PRINT TRACKING OPTION" bodyStyle={{ display: 'grid', placeItems: 'center' }} footer={<><Button icon={<PrinterOutlined />} type='primary' block onClick={handlePrint}>Print Code</Button></>} width={700}>
                <div style={{ height: '50vh', width: '100%', position: 'relative', overflowY: 'auto' }}>
                    <div style={{ height: 'auto', width: 'inherit', position: 'absolute', top: 0, left: 0 }}>
                        {
                            error ?
                                <Result status={"500"} title="Unable To Fetch ID" subTitle="Please Try Again" />
                                :
                                (!data || isLoading) ?
                                    <Skeleton active /> :
                                    <div style={{ padding: 15 }} ref={qrPrintRef}>
                                        <Descriptions layout="vertical" bordered column={4}>
                                            <Descriptions.Item label={data.pr_no} span={2}>
                                                <QRCode value={`${props?.id as string},${data?.pr_no},${data?.reference},${data?.enduserId}`} icon="/logo-small.png" size={200} bordered={false} />
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Note" span={2}>
                                                When Scanning QRCode using the AutoProc Utility App&copy;, select the option for specifying which document is being currently tracked, which office & section it is being delivered to, and the type of document action [IN, OUT].
                                            </Descriptions.Item>
                                        </Descriptions>
                                        <Divider>
                                            OR ALTERNATIVELY
                                        </Divider>
                                        <RenderTable />
                                    </div>
                        }
                    </div>
                </div>
            </Modal >
        </>
    )
}


const Columns: TableColumnsType = [
    {
        title: 'Signature',
        key: 'signaturee',
        dataIndex: '',
        render: (e: any) => {
            return (
                <div style={{ height: 25 }}></div>
            )
        }
    },
    {
        title: 'Office & Section',
        key: 'ofc&sec',
        dataIndex: '',
        render: (e: any) => {
            return (
                <div style={{ height: 25 }}></div>
            )
        }
    },
    {
        title: 'Type of Document',
        key: 'tpDocument',
        dataIndex: '',
        render: (e: any) => {
            return (
                <div style={{ height: 25 }}></div>
            )
        }
    },
    {
        title: 'In?',
        key: 'isIn',
        dataIndex: '',
        width: 50,
        render: (e: any) => {
            return (
                <div style={{ height: 25 }}></div>
            )
        }
    },
    {
        title: 'Out?',
        key: 'isOut',
        dataIndex: '',
        width: 50,
        render: (e: any) => {
            return (
                <div style={{ height: 25 }}></div>
            )
        }
    },
    {
        title: 'Date',
        key: 'date',
        dataIndex: '',
        render: (e: any) => {
            return (
                <div style={{ height: 25 }}></div>
            )
        }
    },
    {
        title: 'Time',
        key: 'time',
        dataIndex: '',
        render: (e: any) => {
            return (
                <div style={{ height: 25 }}></div>
            )
        }
    },
]

const RenderTable = memo(function () {
    const dataSets = new Array(20).fill(0)
    return (
        <Table caption={<p style={{ textAlign: 'center', padding: '5px 0' }}>MANUAL TRACKING</p>} dataSource={dataSets.map((item, idx) => ({ key: idx })) as any} columns={Columns as any} pagination={false} size='small' bordered style={{ margin: 0, padding: 0, borderRadius: 0 }} />
    )
})
export default memo(printQRCode);