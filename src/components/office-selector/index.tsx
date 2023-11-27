//TO BE USED INSIDE A ANTD FORM
import { Cascader, CascaderProps } from "antd";
import { forwardRef } from "react";

interface Option {
    value: string;
    label: string | null;
    children?: Option[];
}

type OfficeDesignateSelectorProps = {
    data: CascaderProps["options"];
} & CascaderProps;

const OfficeDesignateSelector = forwardRef(function Wrapper(props: OfficeDesignateSelectorProps, ref) {
    const { data, ...rest } = props;

    return <Cascader options={data} {...rest} placement="bottomLeft" />;
});

export default OfficeDesignateSelector;
