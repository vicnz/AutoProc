'use client';

import { MailOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Segmented, SegmentedProps } from "antd";
import { ForwardedRef, forwardRef } from "react";

const options: SegmentedProps["options"] = [
    { icon: <TeamOutlined />, value: "review", label: "Review", title: "Review" },
    {
        icon: <UserOutlined />,
        value: "approve",
        label: "Approve",
        title: "Approve",
    },
    { icon: <MailOutlined />, value: "notice", label: "Notice", title: "Notice" },
];
type ISegmentProps = Omit<SegmentedProps, "options">;
//
const Picker = forwardRef(function CompPicker(props: ISegmentProps, ref: ForwardedRef<any>) {
    return <Segmented {...props} ref={ref} options={options} />;
});

export default Picker;
