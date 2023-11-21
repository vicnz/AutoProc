import { Descriptions, Divider, Flex, Table, TableColumnsType } from "antd";
import dayjs from "dayjs";
import React, { forwardRef } from "react";
import { ToPeso } from "@lib/intl/currency";

type ReportProps = {
    data: {
        data: Array<any>;
        meta: {
            count: number;
            endDate: string;
            startDate: string;
            days: number;
            generated: string;
            subTotal: number;
        }; //should be a mapp of data
    };
};
//
const columns: TableColumnsType = [
    {
        key: "short-hand",
        dataIndex: "number",
        title: "PO No.",
    },
    {
        key: "items",
        dataIndex: "particulars",
        title: "Particulars",
    },
    {
        key: "render",
        dataIndex: "purpose",
        title: "Purpose",
    },
    {
        key: "total",
        dataIndex: "total",
        title: "Cost",
        render: (e) => {
            return <span>{ToPeso(e)}</span>;
        },
    },
    {
        key: "type",
        dataIndex: "type",
        title: "Type",
    },
    {
        key: "supplier",
        dataIndex: "supplier",
        title: "Supplier",
    },
    {
        key: "date",
        dataIndex: "date",
        title: "Issued",
        render: (e) => {
            const string = dayjs(e as string).format("YYYY-MM-DD");
            return <span>{string}</span>;
        },
    },
];
const Index = forwardRef(function WrapperComponent(props: ReportProps, ref) {
    const { data, ...rest } = props;
    const { data: reports, meta } = data;
    return (
        <div {...rest} ref={ref as any} style={{ padding: "15px 25px", background: "white", borderRadius: 8 }}>
            <Flex justify="center" align="center" vertical>
                <span style={{ fontSize: "2em" }}>GENERATED PURCHASE REPORT</span>
                <span>{dayjs(meta.generated).get("year")}</span>
            </Flex>
            <br />
            <Flex align="center" justify="center">
                <Descriptions column={5} layout="vertical" size="small" bordered>
                    <Descriptions.Item label="Generated At">
                        {dayjs(meta.generated).format("MMMM DD, YYYY (hh:mm A)")}
                    </Descriptions.Item>
                    <Descriptions.Item label="No. POs">{meta.count} Items</Descriptions.Item>
                    <Descriptions.Item label="Start Date">
                        <span>{dayjs(meta.startDate).format("MMMM DD, YYYY")}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="End Date">
                        <span>{dayjs(meta.endDate).format("MMMM DD, YYYY")}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Days">
                        <span>{meta.days} Days</span>
                    </Descriptions.Item>
                </Descriptions>
            </Flex>
            <Divider />
            <Table dataSource={reports} columns={columns as any} pagination={false} size="small" />
            <br />
            <Flex justify="end" align="center">
                <Descriptions size="small" bordered>
                    <Descriptions.Item label="Subtotal">{ToPeso(meta.subTotal)}</Descriptions.Item>
                </Descriptions>
            </Flex>
        </div>
    );
});

export default Index;
