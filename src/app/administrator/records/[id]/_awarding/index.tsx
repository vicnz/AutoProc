'use client';
import useSWR from 'swr';
import { EditOutlined, PrinterOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Result, Segmented, Space, Switch, Watermark, theme } from "antd";
import dynamic from "next/dynamic";
import { createContext, useContext, useRef, useState } from "react";
import EditForm from './edit'
import { useReactToPrint } from 'react-to-print';
import PreviewPane from './preview'

const { useToken } = theme
const PurchaseRequest = function () {
    const { token } = useToken()
    const printableComponent = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => printableComponent.current
    })

    return (
        <div style={{ display: 'grid', gridTemplateRows: '56px 1fr', width: '100%', height: 'calc(100vh - 112px)' }}>
            <div style={{ height: '56px', borderBottom: 'solid lightgray 1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p>Awarding</p>
                <Space>
                    <EditForm />
                    <Dropdown.Button onClick={handlePrint} menu={{ items: [{ key: 'ack', label: 'Acknowledgement' }, { key: 'retrival', label: 'Retrieval' }] }} icon={<PrinterOutlined />}>Print</Dropdown.Button>
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