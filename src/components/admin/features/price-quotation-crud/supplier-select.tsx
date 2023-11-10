"use client";

import { WarningOutlined } from "@ant-design/icons";
import { Select, Skeleton } from "antd";
import React, { forwardRef, memo } from "react";
import useSWR from "swr";

const SupplierSelectFormItem = forwardRef(function Wrapper(props, ref) {
    const { data, isLoading, error } = useSWR("/administrator/api/suppliers?_all=true");
    const { ...rest } = props;

    if (error) {
        return (
            <span>
                <WarningOutlined /> Failed To Load Suppliers
            </span>
        );
    }

    if (!data || isLoading) {
        return <Skeleton.Input active />;
    }

    return (
        <Select
            {...rest}
            ref={ref as any}
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Select Suppliers"
            options={(data as Array<{ id: string; name: string }>).map((item) => ({
                key: item.id,
                label: item.name,
                value: JSON.stringify({ id: item.id, name: item.name }),
            }))}
        />
    );
});

export default memo(SupplierSelectFormItem);
