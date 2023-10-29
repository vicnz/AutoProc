"use client";

import { Checkbox, Descriptions, Divider, Form, Input, InputNumber, List, Space, Tag, theme } from "antd";
import { forwardRef, memo } from "react";

interface ParcelItemMutateProps {
    items: any[]; //TODO
    restFields: any;
    RowKey: any;
    name: any;
}

//
const ParcelItemEditor = forwardRef(function ParcelItemEditorWrapper(props: ParcelItemMutateProps, ref) {
    const { items, restFields, RowKey, name } = props;
    const { token } = theme.useToken();
    return (
        <div ref={ref as any}>
            <Descriptions bordered size="small">
                <Descriptions.Item label="Name" span={1}>
                    {items[RowKey].description}
                </Descriptions.Item>
                <Descriptions.Item label="Quantity" span={1}>
                    {items[RowKey].qty} Item(s)
                </Descriptions.Item>
                <Descriptions.Item label="Unit" span={1}>
                    {Intl.NumberFormat("en", { style: "currency", currency: "PHP" }).format(items[RowKey].price)}
                </Descriptions.Item>
                <Descriptions.Item label="Total" span={1}>
                    {Intl.NumberFormat("en", { style: "currency", currency: "PHP" }).format(items[RowKey].total)}
                </Descriptions.Item>
                <Descriptions.Item label="Remarks" span={2}>
                    {items[RowKey].remarks || "N/A"}
                </Descriptions.Item>
            </Descriptions>
            <Divider orientation="left" style={{ border: token.colorPrimary, color: token.colorPrimary }}>
                Checklist
            </Divider>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Form.Item name={[name, "verified", "count"]} label="Item Count" noStyle>
                    <InputNumber
                        max={items[RowKey].qty}
                        min={0}
                        autoComplete="false"
                        placeholder="Item Count"
                        style={{ width: 200 }}
                    />
                </Form.Item>
                <Divider type="vertical" />
                <Form.Item name={[name, "verified", "quality"]} valuePropName="checked" noStyle>
                    <Checkbox>Quality</Checkbox>
                </Form.Item>
                <Divider type="vertical" />
                <Form.Item name={[name, "verified", "aligned"]} valuePropName="checked" noStyle>
                    <Checkbox>Authentic</Checkbox>
                </Form.Item>
                <Divider type="vertical" />
                <Form.Item name={[name, "remarks"]} label="Remarks" noStyle>
                    <Input placeholder="Remarks" allowClear />
                </Form.Item>
            </div>
        </div>
    );
});

export default memo(ParcelItemEditor);
