import { PrinterOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Button, Card, Modal, QRCode, Space } from "antd";
import { useRef, useState } from "react";

import PrintableComponent from './printed.component';

const PreviewPane = function (props: { printRef?: any }) {
    const containerRef = useRef(null)
    return (
        <>
            <Space style={{ width: '100%' }} direction="vertical" ref={containerRef}>
                <Card style={{ width: 'inherit' }}>
                    <PrintableComponent ref={props.printRef} />
                </Card>
            </Space>
        </>
    )
}

const PrintQRCode = function () {
    const [preview, setQRPreview] = useState(false)
    return (
        <>
            <Button icon={<QrcodeOutlined />} onClick={() => setQRPreview(true)}>TRACKING</Button>
            <Modal open={preview} closable onCancel={() => setQRPreview(false)} footer={<div style={{ textAlign: 'center' }}><Button icon={<PrinterOutlined />} >Print</Button></div>} width={450} bodyStyle={{ display: 'grid', placeItems: 'center' }}>
                <QRCode value="Sample QR Code" size={300} />
            </Modal>
        </>
    )
}

export default PreviewPane;