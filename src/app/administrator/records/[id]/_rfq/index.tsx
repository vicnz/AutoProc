'use client';
//lib
import useSWR from 'swr';
import { FileProtectOutlined, LockOutlined, PrinterOutlined } from "@ant-design/icons";
import { Button, Divider, Result, Segmented, Select, Skeleton, Space, Tag, theme } from "antd";
import { useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print';
//components
import EditForm from './edit';
import PreviewPane from './preview';
import Pattern from '../_components/pattern';
import AddNewDocument from './addnew';
import { usePrId } from '../pr-id-context';
import SupplierToPrint from './supplier-to-print';
//configs
const { useToken } = theme
///
const RequestForQuotation = function () {
    const prId = usePrId()
    const { token } = useToken()
    const [isReceipt, setReceipt] = useState('rfq')
    const [openSupplier, setOpenSupplier] = useState("")
    const printableComponent = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => printableComponent.current
    })

    const { data, isLoading, error } = useSWR(`/administrator/api/records/rfq?_id=${prId}`)

    if (error) {
        return (
            <Result status={'500'} title="Network Error" subTitle="Please Try Again Later or Refresh the Page" />
        )
    }
    if (isLoading || !data) {
        return <Skeleton active />
    } else {
        if (data.result === null) {
            return <AddNewDocument data={data.result} id={prId} />
        } else {
            return (
                <div style={{ display: 'grid', gridTemplateRows: '56px 1fr', width: '100%', height: 'calc(100vh - 112px)' }}>
                    <div style={{ height: '56px', borderBottom: 'solid lightgray 1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p>RFQ</p>
                        <Space>
                            <Tag color={`${data.result.final ? 'success' : 'blue'}`}>{data.result.final ? 'Approved' : 'Pending...'}</Tag>
                            <Divider type="vertical" />
                            {
                                !(isReceipt === 'reciept') ?
                                    <>
                                        <SupplierToPrint data={data?.result} handlePrint={handlePrint} activeSupplier={openSupplier} setSupplier={setOpenSupplier} />
                                    </> :
                                    <>
                                        <Button icon={<PrinterOutlined />} onClick={handlePrint}>Print</Button>
                                    </>
                            }
                            <Segmented options={[{ icon: <FileProtectOutlined />, label: 'Request', value: 'rfq' }, { icon: <FileProtectOutlined />, label: 'Reciept', value: 'reciept' }]} defaultValue={'rfq'} onChange={e => setReceipt(e as string)} />
                            <EditForm rfqData={data.result} />
                        </Space>
                    </div>
                    <Pattern>
                        <PreviewPane ref={printableComponent} data={data.result} reciept={isReceipt === 'reciept'} supplier={openSupplier} />
                    </Pattern>
                </div>
            )
        }
    }

}

export default RequestForQuotation;