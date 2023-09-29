'use client';

import { PrinterOutlined } from "@ant-design/icons";
import { Space, Select, Button } from "antd";

const SupplierToPrint = function (props: { data: any, handlePrint: any, activeSupplier: any, setSupplier: any }) {
    return (
        <>
            <Space.Compact>
                <Select defaultActiveFirstOption style={{ width: 150 }} value={props.activeSupplier} onChange={e => props.setSupplier(e)} placeholder='Display Supplier'>
                    {
                        (props.data?.suppliers as any[]).map((item, idx) => {
                            return (<Select.Option value={item?.name} key={item?.id}>{item.name}</Select.Option>)
                        })
                    }
                </Select>
                <Button icon={<PrinterOutlined />} onClick={props.handlePrint}>Print</Button>
            </Space.Compact>
        </>
    )
}

export default SupplierToPrint;