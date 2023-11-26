"use client";

import {
    Collapse,
    Divider,
    FormListFieldData,
    theme,
    Checkbox,
    Descriptions,
    Form,
    Input,
    InputNumber,
    Flex,
} from "antd";
import { forwardRef, memo, useMemo } from "react";

import { CheckCircleOutlined, MinusCircleOutlined, NumberOutlined } from "@ant-design/icons";

type DeliveryManagerProp = {
    items: any[]; //TODO
    fields: FormListFieldData[];
};

const ParcelItem = forwardRef(function ParcelItemWrapper(props: DeliveryManagerProp, ref) {
    const { token } = theme.useToken();
    const { items, fields, ...rest } = props;

    const renderItems = useMemo(() => {
        const _items = fields.map(({ key: RowKey, name, ...restFields }) => {
            return {
                showArrow: false,
                key: RowKey,
                extra: (
                    <>
                        {items[RowKey].completed ? (
                            <span style={{ color: token.colorSuccess }}>
                                <CheckCircleOutlined />
                            </span>
                        ) : (
                            <span style={{ color: token.colorInfo }}>
                                <MinusCircleOutlined />
                            </span>
                        )}
                    </>
                ),
                label: (
                    <span>
                        <NumberOutlined /> {(RowKey + 1).toString().padStart(3, "0")} <Divider type="vertical" />
                        <span style={{ fontWeight: "bold" }}>
                            {(items[RowKey].description as string).substring(0, 30) + "..."}
                        </span>
                    </span>
                ),
                children: (
                    <>
                        <ParcelEditor RowKey={RowKey} items={items} name={name} restFields={restFields} />
                    </>
                ),
            };
        });
        return _items;
    }, [fields, items, token.colorInfo, token.colorSuccess]);
    return (
        <>
            <Collapse {...rest} ref={ref as any} items={renderItems} accordion />
        </>
    );
});

export default memo(ParcelItem);

interface ParcelItemMutateProps {
    items: any[]; //TODO
    restFields: any;
    RowKey: any;
    name: any;
}

//
const ParcelEditor = forwardRef(function ParcelItemEditorWrapper(props: ParcelItemMutateProps, ref) {
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
            <Flex vertical gap={10}>
                <Flex align="center" justify="space-around">
                    <Form.Item name={[name, "verified", "quality"]} valuePropName="checked" noStyle>
                        <Checkbox>Quality</Checkbox>
                    </Form.Item>
                    <Form.Item name={[name, "verified", "aligned"]} valuePropName="checked" noStyle>
                        <Checkbox>Authentic</Checkbox>
                    </Form.Item>
                </Flex>
                <Form.Item name={[name, "verified", "count"]} label="Item Count" noStyle>
                    <InputNumber
                        max={items[RowKey].qty}
                        min={0}
                        autoComplete="false"
                        placeholder="Item Count"
                        style={{ width: "100%" }}
                    />
                </Form.Item>
                <Form.Item name={[name, "remarks"]} label="Remarks" noStyle>
                    <Input placeholder="Remarks" allowClear />
                </Form.Item>
            </Flex>
        </div>
    );
});
