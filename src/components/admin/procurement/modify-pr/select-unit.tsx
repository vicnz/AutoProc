import { UNIT_OF_MEASUREMENTS } from "@/lib/contants";
import { Select } from "antd";
import { forwardRef } from "react";

const SelectUnit = forwardRef((props, ref) => {
    return (
        <Select
            {...props}
            ref={ref as any}
            style={{ width: 135 }}
            placeholder="Unit of Issue"
            options={UNIT_OF_MEASUREMENTS.map((item) => ({ label: item.name, value: item.value }))}
        />
    )
})

export default SelectUnit;