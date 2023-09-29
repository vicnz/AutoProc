'use client';
//libs
import { LockOutlined, PrinterOutlined } from "@ant-design/icons";
import { Button, Divider, Result, Skeleton, Space, Tag, theme } from "antd";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
//components
import EditForm from './edit';
import PreviewPane from './preview';
import useSWR from "swr";
import { usePrId } from '../pr-id-context'
import Pattern from '../_components/pattern'
import AddNewDocument from './addnew'
import MakeFinalDocument from '../_components/document-need-final'
//configs
const { useToken } = theme
//
const AbstractOfQuotation = function () {
    const prId = usePrId()
    const { token } = useToken()
    const printableComponent = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => printableComponent.current
    })

    const { data, isLoading, error } = useSWR(`/administrator/api/records/abstract?_id=${prId}`)

    if (error) {
        return (
            <Result status={'500'} title="Network Error" subTitle="Please Try Again Later or Refresh the Page" />
        )
    }
    if (isLoading || !data) {
        return <Skeleton active />
    } else {
        if ((data.final as Array<{ id: string, final: boolean }>).every(item => item.final === true)) {
            return <MakeFinalDocument title="Complete Purchase Request and Price Quotation" subTitle="Purchase Request and Price Quotation first needs to be completed" />
        } else {
            if (data.result === null) {
                return <AddNewDocument data={data.result} id={prId} />
            } else {
                return (
                    <div style={{ display: 'grid', gridTemplateRows: '56px 1fr', width: '100%', height: 'calc(100vh - 112px)' }}>
                        <div style={{ height: '56px', borderBottom: 'solid lightgray 1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <p>Abstract Of Quotation</p>
                            <Space>
                                <Tag color={`${data.result.final ? 'success' : 'blue'}`}>{data.result.final ? 'Approved' : 'Pending...'}</Tag>
                                <Divider type="vertical" />
                                <Button icon={<PrinterOutlined />} onClick={handlePrint}>Print</Button>
                                <EditForm data={data.result} />
                            </Space>
                        </div>
                        <Pattern>
                            <PreviewPane ref={printableComponent} data={data.result} />
                        </Pattern>
                    </div>
                )
            }
        }
    }
}

export default AbstractOfQuotation;