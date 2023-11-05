import { WarningOutlined } from "@ant-design/icons";
import { AutoComplete, AutoCompleteProps, Select, SelectProps, Skeleton } from "antd";
import { forwardRef, memo, useMemo } from "react";
import useSWR from "swr";

const DepartmentSelector = forwardRef(function DepartmentSelectorWrapper(props: SelectProps, ref) {
    const { ...rest } = props;
    const { data, isLoading, error } = useSWR("/administrator/api/entities/department?department=true&pick_only=true");
    if (error) {
        return (
            <span>
                <WarningOutlined /> Error Loading Data
            </span>
        );
    }
    if (!data || isLoading) {
        return <Skeleton.Input active />;
    }

    const options = data.map((item: { description: string; id: string }) => {
        return { label: item.description, value: item.id };
    });

    return (
        <>
            <Select {...rest} options={options} allowClear ref={ref as any} />
        </>
    );
});

export default memo(DepartmentSelector);
