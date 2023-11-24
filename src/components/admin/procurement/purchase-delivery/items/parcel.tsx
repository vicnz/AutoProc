"use client";

import { Collapse, Divider, FormListFieldData, CollapsePanelProps, theme } from "antd";
import { forwardRef, memo, useMemo } from "react";

import ParcelEditor from "./item";
import {
    CheckCircleOutlined,
    CheckOutlined,
    CheckSquareOutlined,
    LoadingOutlined,
    MinusCircleOutlined,
    MinusSquareOutlined,
    NumberOutlined,
} from "@ant-design/icons";

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
                                <CheckCircleOutlined /> Completed
                            </span>
                        ) : (
                            <span style={{ color: token.colorInfo }}>
                                <MinusCircleOutlined /> Incomplete
                            </span>
                        )}
                    </>
                ),
                label: (
                    <span>
                        <NumberOutlined /> {(RowKey + 1).toString().padStart(3, "0")} <Divider type="vertical" />
                        <span style={{ fontWeight: "bold" }}>{items[RowKey].description}</span>
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
    }, [fields, items]);
    return (
        <>
            <Collapse {...rest} ref={ref as any} items={renderItems} size="small" accordion />
        </>
    );
});

export default memo(ParcelItem);
