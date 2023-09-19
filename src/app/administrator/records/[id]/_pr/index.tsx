'use client';
//libs
import { PrinterOutlined } from "@ant-design/icons";
import { Button, Space, theme } from "antd";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
//components
import EditForm from './edit';
import PreviewPane from './preview';
import useSWR from "swr";
import { usePrId } from '../pr-id-context'
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

    return (
        <div style={{ display: 'grid', gridTemplateRows: '56px 1fr', width: '100%', height: 'calc(100vh - 112px)' }}>
            <div style={{ height: '56px', borderBottom: 'solid lightgray 1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p>Purchase Request : {prId}</p>
                <Space>
                    <EditForm />
                    <Button icon={<PrinterOutlined />} onClick={handlePrint}>Print</Button>
                </Space>
            </div>
            <div style={{ position: 'relative', height: '100%', width: '100%', overflowY: 'auto', background: `linear-gradient(90deg, ${token.colorBgLayout}, calc(22px - 2px), transparent 1%) center / 22px 22px, linear-gradient(${token.colorBgLayout}, calc(22px - 2px), transparent 1%) center / 22px 22px, ${token.colorPrimary}` }}>
                <div style={{ position: 'absolute', height: 'auto', top: 0, left: 0, padding: '15px 0', display: 'grid', placeItems: 'center', width: 'inherit' }}>
                    <div style={{ display: 'grid', placeItems: 'center', width: 669, }}>
                        <PreviewPane ref={printableComponent} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseRequest;