"use client";

import { Collapse, Divider, FormListFieldData, CollapsePanelProps } from "antd";
import { forwardRef, memo, useMemo } from "react";

import ParcelEditor from "./item";
import { CheckOutlined, CheckSquareOutlined, LoadingOutlined, MinusSquareOutlined, NumberOutlined } from "@ant-design/icons";

type DeliveryManagerProp = {
    items: any[]; //TODO
    fields: FormListFieldData[];
};

const ParcelItem = forwardRef((props: DeliveryManagerProp, ref) => {
    const { items, fields, ...rest } = props;

    const renderItems = useMemo(() => {
        const _items = fields.map(({ key: RowKey, name, ...restFields }) => {
            return {
                showArrow: false,
                key: RowKey,
                extra: (
                    <>
                        {items[RowKey].completed ? (
                            <span>
                                <CheckSquareOutlined /> Completed
                            </span>
                        ) : (
                            <span>
                                <LoadingOutlined /> Pending
                            </span>
                        )}
                    </>
                ),
                label: (
                    <span>
                        <NumberOutlined /> {(RowKey + 1).toString().padStart(3, "0")} <Divider type="vertical" />
                        {items[RowKey].description}
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
            <Collapse {...rest} ref={ref as any} items={renderItems} size="small" />
        </>
    );
});

export default memo(ParcelItem);
