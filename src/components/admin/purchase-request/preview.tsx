import { PrinterOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Affix, Button, Card, Descriptions, Divider, Modal, QRCode, Result, Space, Table, Watermark } from "antd";
import { useRef, useState } from "react";
import Image from 'next/image'
import BSCBANNER from '@media/templates/bsclogo.png'
import AMBISYON from '@media/templates/ambisyon.png'

const dataSource = [
    {
        key: '1',
        qty: 45,
        type: 'pcs',
        item: 'Sesame Seeds',
        stock: null,
        unit: 145.00,
        total: 3_345.78
    },
    {
        key: '2',
        qty: 34,
        type: 'pcs',
        item: 'Machine Gun Kelly',
        stock: '232-434-AB',
        unit: 145.00,
        total: 3_345.78
    },
];

const columns = [
    {
        title: 'Quantity',
        dataIndex: 'qty',
        key: 'qty',
    },
    {
        title: 'Unit of Issue',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Item Description',
        dataIndex: 'item',
        key: 'item',
    },
    {
        title: 'Stock No.',
        dataIndex: 'stock',
        key: 'stock',
    },
    {
        title: "Estimated",
        children: [
            {
                title: 'Unit Cost',
                dataIndex: 'unit',
                key: 'unit',
            },
            {
                title: 'Total Cost',
                dataIndex: 'total',
                key: 'total',
            },
        ]
    }
];

const PreviewPane = function () {
    const [container, setContainer] = useState()
    const containerRef = useRef(null)
    return (
        <>
            <Space style={{ width: '100%' }} direction="vertical" ref={containerRef}>
                <Card style={{ width: 'inherit' }} extra={<Button.Group><PrintQRCode /><Button icon={<PrinterOutlined />} >PRINT</Button></Button.Group>}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div data-printable="true" style={{ height: '800px', maxWidth: '669px', border: 'dashed lightgray 1px', padding: 15 }}>
                            <Space direction="vertical" size="middle" style={{ height: 'inherit', display: 'grid', gridTemplateRows: 'auto auto 1fr auto', gridTemplateColumns: '1fr' }}>
                                <div style={{ height: '100px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <Image alt="ambisyon" src={BSCBANNER} width={300} height={75} />
                                    <Image alt="ambisyon" src={AMBISYON} width={150} height={75} />
                                </div>
                                <Descriptions bordered size="small">
                                    <Descriptions.Item label="PR No.">2023-09-87894</Descriptions.Item>
                                    <Descriptions.Item label="Date" span={2}>2023/09/03</Descriptions.Item>
                                    <Descriptions.Item label="End User" span={3}>Jarvis Fleck</Descriptions.Item>
                                    <Descriptions.Item label="Department">Bids & Awards Office</Descriptions.Item>
                                    <Descriptions.Item label="SAI No." span={2}>679879</Descriptions.Item>
                                    <Descriptions.Item label="Section">Procurement Management</Descriptions.Item>
                                    <Descriptions.Item label="OBR No.">9048509</Descriptions.Item>
                                </Descriptions>
                                <Table
                                    dataSource={dataSource}
                                    columns={columns}
                                    size="small"
                                    pagination={false}
                                    bordered
                                    summary={
                                        () => (
                                            <Table.Summary fixed>
                                                <Table.Summary.Row>
                                                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={4}>Total</Table.Summary.Cell>
                                                    <Table.Summary.Cell index={5}>786</Table.Summary.Cell>
                                                </Table.Summary.Row>
                                            </Table.Summary>
                                        )
                                    }
                                />
                                <Descriptions bordered size="small">
                                    <Descriptions.Item label="Purpose" span={3}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci placeat quis repudiandae sit odio ipsum aspernatur incidunt ea neque. Officiis repellat quo atque dolorem vero quae corrupti aperiam animi magni amet velit veniam a aut nulla voluptate pariatur aspernatur voluptas iusto fugiat ab dicta voluptatibus, saepe iste! Quos, cum illo!
                                    </Descriptions.Item>
                                </Descriptions>
                            </Space>
                        </div>
                    </div>
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