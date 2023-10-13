'use client';
//
import { Descriptions } from "antd"
import dayjs from "dayjs"
import { memo } from "react";

//types
interface TopSectionProps {
    data: {
        number: string,
        date: string,
        obr: string,
        sai: string,
        department: string,
        section: string
        reference: string
    }
}

const TopSection = function (props: TopSectionProps) {
    return (
        <div style={{ padding: '5px 25px' }}>
            <Descriptions bordered size='small' column={{ lg: 3, md: 3, xl: 3 }} layout='vertical'>
                <Descriptions.Item label="PR Number" span={2}>{props.data?.number}</Descriptions.Item>
                <Descriptions.Item label="Date">{dayjs(props.data.date).format('MM/DD/YYYY')}</Descriptions.Item>
                <Descriptions.Item label="Reference No.">BAC-RESO No. {props.data?.reference}</Descriptions.Item>
                <Descriptions.Item label="OBR">{props.data?.obr}</Descriptions.Item>
                <Descriptions.Item label="SAI">{props.data?.sai}</Descriptions.Item>
                <Descriptions.Item label="Department">{props.data.department}</Descriptions.Item>
                <Descriptions.Item label="Section">{props.data.section}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default memo(TopSection);