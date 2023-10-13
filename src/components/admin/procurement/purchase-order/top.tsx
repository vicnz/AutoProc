'use client';

import { Descriptions } from "antd";
import dayjs from "dayjs";
import { memo } from "react";

const SupplierInformation = function (props: { data: any }) {
    return (
        <div style={{ padding: '5px 25px' }}>
            <Descriptions bordered size="small" column={4}>
                <Descriptions.Item label='Supplier' span={2}>
                    {props.data.supplier.name}
                </Descriptions.Item>
                <Descriptions.Item label="PO No." span={2}>
                    {props.data.number}
                </Descriptions.Item>
                <Descriptions.Item label="Address" span={2}>
                    {props.data.supplier.address}
                </Descriptions.Item>
                <Descriptions.Item label="Date" span={2}>
                    {dayjs(props.data.date).format('MM/DD/YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="TIN" span={4}>
                    {props.data.supplier.tin}
                </Descriptions.Item>
            </Descriptions>
            <div style={{ padding: '15px 0px', fontSize: '.9em' }}>
                Please furnish this office the following articles subject to the term and conditions contained herein:
            </div>
            <Descriptions size="small" bordered column={2}>
                <Descriptions.Item label="Place of Delivery" span={1}>
                    {props.data.destination}
                </Descriptions.Item>
                <Descriptions.Item label="Delivery Term" span={1}>
                    {props.data.term}
                </Descriptions.Item>
                <Descriptions.Item label="Days of Delivery" span={1}>
                    {props.data.duration} Day(s)
                </Descriptions.Item>
                <Descriptions.Item label="Payment Term" span={1}>
                    {props.data.payment}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default memo(SupplierInformation);