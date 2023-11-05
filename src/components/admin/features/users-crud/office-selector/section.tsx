import { WarningOutlined } from "@ant-design/icons";
import { AutoComplete, AutoCompleteProps, Form, Select, SelectProps, Skeleton } from "antd";
import { forwardRef, memo, useEffect, useMemo } from "react";
import useSWR from "swr";

const SectionSelector = forwardRef(function DepartmentSelectorWrapper(
    props: SelectProps & { deptId?: string; form?: any },
    ref
) {
    const { deptId, form, ...rest } = props;
    const departmentID = Form.useWatch("departmentId", form);

    const { data, isLoading, error } = useSWR(
        `/administrator/api/entities/department?section=true&pick_only=true&dept_id=${departmentID}`
    );

    useEffect(() => {
        form?.setFieldValue("sectionId", null);
    }, [departmentID, form]);

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

export default SectionSelector;
