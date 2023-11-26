"use client";
//
import { Descriptions } from "antd";
import dayjs from "dayjs";
import { memo } from "react";

//types
interface TopSectionProps {
    data: {
        number: string;
        date: string;
        obr: string;
        sai: string;
        department: string;
        section: string;
        reference: string;
    };
}

const TopSection = function (props: TopSectionProps) {
    return (
        <div style={{ padding: "5px 25px" }}>
            <Descriptions bordered size="small" column={4} layout="horizontal">
                <Descriptions.Item label="PR Number" span={2}>
                    {props.data?.number}
                </Descriptions.Item>
                <Descriptions.Item label="Date" span={2}>
                    {dayjs(props.data.date).format("MM/DD/YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Reference No." span={2}>
                    {props.data?.reference}
                </Descriptions.Item>
                <Descriptions.Item label="OBR" span={2}>
                    {props.data?.obr}
                </Descriptions.Item>
                <Descriptions.Item label="Department" span={2}>
                    {props.data.department}
                </Descriptions.Item>
                <Descriptions.Item label="Section" span={2}>
                    {props.data.section}
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default memo(TopSection);
