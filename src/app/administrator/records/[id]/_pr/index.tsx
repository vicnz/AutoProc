'use client';
//libs
import { LoadingOutlined, LockOutlined, PrinterOutlined } from "@ant-design/icons";
import { Badge, Button, Divider, Result, Skeleton, Space, Spin, Tag, theme } from "antd";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
//components
import EditForm from './edit';
import PreviewPane from './preview';
import useSWR from "swr";
import { usePrId } from '../pr-id-context'
import Pattern from '../_components/pattern'
import type { IAPIReturnType } from './types'
//configs
const { useToken } = theme
//
const PurchaseRequest = function () {
    const prId = usePrId()
    const { token } = useToken()
    const printableComponent = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => printableComponent.current
    })

    const { data, isLoading, error, isValidating } = useSWR<IAPIReturnType | null>(`/administrator/api/records/pr?_id=${prId}`)

    if (error) {
        return (
            <Result status={'500'} title="Network Error" subTitle="Please Try Again Later or Refresh the Page" />
        )
    }
    if (isLoading || !data) {
        return <Skeleton active />
    }
    else {
        return (
            <>
                <div style={{ display: 'grid', gridTemplateRows: '56px 1fr', width: '100%', height: 'calc(100vh - 112px)' }}>
                    <div style={{ height: '56px', borderBottom: 'solid lightgray 1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p>Purchase Request</p>
                        <Space>
                            <Tag color={`${data.final ? 'success' : 'blue'}`}>{data.final ? 'Approved' : 'Pending...'}</Tag>
                            <Divider type="vertical" />
                            <Button icon={<PrinterOutlined />} onClick={handlePrint}>Print</Button>
                            <EditForm data={data} />
                        </Space>
                    </div>
                    <Pattern>
                        <PreviewPane ref={printableComponent} data={data} />
                    </Pattern>
                </div>
            </>
        )
    }
}

export default PurchaseRequest;