"use client";

/**
 * * - PR UNIT SELECTOR [SELECT PARTICULARS] MINI SUB-FEATURE
 * * - Select Unit Item, data is populated from the Units Model
 * * - From database
 */

import { WarningOutlined } from "@ant-design/icons";
import { Select, SelectProps, Skeleton } from "antd";
import { forwardRef, memo } from "react";
import useSWR from "swr";

//UNITS EDITOR
import UnitsEditor from "@components/admin/features/units-crud";

//
const SelectUnit = forwardRef(function SelectUnit(props, ref) {
    const { data, isLoading, error } = useSWR<Array<{ id: string; name: string }>, any>(
        "/administrator/api/entities/units"
    );
    if (error) {
        return (
            <p>
                <WarningOutlined /> Faild To Load
            </p>
        );
    }

    if (!data || isLoading) {
        return <Skeleton.Input active />;
    }

    //Render Content
    const options: SelectProps["options"] = data.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });

    return (
        <Select
            {...props}
            ref={ref as any}
            style={{ width: 135 }}
            placeholder="Unit of Issue"
            options={options}
            dropdownRender={(menu) => (
                <>
                    {menu}
                    {/* OPEN UNIT EDITOR [STILL A TODO FEATURE]  */}
                    <UnitsEditor isEdit={false} buttonProps={{ block: true }} />
                </>
            )}
        />
    );
});

export default memo(SelectUnit);
