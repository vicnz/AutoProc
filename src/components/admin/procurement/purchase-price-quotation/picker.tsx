import { ContainerOutlined, SolutionOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Segmented, SegmentedProps } from "antd";
import { ForwardedRef, forwardRef } from "react";

const options: SegmentedProps['options'] = [
    { icon: <SolutionOutlined />, value: 'quotation', label: 'Quotation', title: 'Request for Price Quotation' },
    { icon: <ContainerOutlined />, value: 'reciept', label: 'Receipt', title: 'Quotation Receipt' }
]
type ISegmentProps = Omit<SegmentedProps, 'options'>

const Picker = forwardRef(function CompPicker(props: ISegmentProps, ref: ForwardedRef<any>) {
    return (
        <Segmented {...props} ref={ref} options={options} />
    )
})

export default Picker;