"use client";

/**
 * * - MINI PREVIEW OF PR
 * * - A small card containing a minimum
 * * - information relating the original
 * * - Purchase Request.
 */

/**
 * TODO - PREVENT THE CASE OF PROP DRILLING
 * TODO - Somehow the Component does not allow
 * TODO - or permit fetching PR DATA from
 * TODO - shared context, need FIX to this
 */

import {
    CalendarOutlined,
    FontSizeOutlined,
    NumberOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card, Descriptions, List, Result, Skeleton } from "antd";
import dayjs from "dayjs";
import useSWR from "swr";
//
import { ToPeso } from "@lib/intl/currency";
import { usePRId } from "@/components/admin/pr-number";

const PRPreview = function (props: { showAmount?: boolean }) {
    const id = usePRId();
    const { data, isLoading, isValidating, error } = useSWR(
        `/administrator/api/procurement/pr?_id=${encodeURIComponent(id)}`
    );

    if (error) {
        return (
            <Card title="PR Information">
                <Result
                    status={"error"}
                    title="Error!"
                    subTitle="Unable to Load Purchase Request Info..."
                />
            </Card>
        );
    }

    if (!data || isLoading) {
        return (
            <Card loading title="PR Information">
                <Skeleton active />
            </Card>
        );
    }

    if (data.empty) {
        return (
            <Card title="Not Found">
                <Result title="PR Not Found" status={'404'} />
            </Card>
        )
    }

    return (
        <>
            <Descriptions
                layout="vertical"
                bordered
                title="Purchase Request Information"
                column={2}
                size="small"
            >
                <Descriptions.Item
                    label={
                        <>
                            <NumberOutlined /> PR Number
                        </>
                    }
                    span={2}
                >
                    {data.number}
                </Descriptions.Item>
                <Descriptions.Item
                    label={
                        <>
                            <CalendarOutlined /> Issued Date
                        </>
                    }
                    span={1}
                >
                    {dayjs(data.date).format("MMMM DD, YYYY")}
                </Descriptions.Item>
                <Descriptions.Item
                    label={
                        <>
                            <NumberOutlined /> Reference
                        </>
                    }
                    span={1}
                >
                    {data.reference}
                </Descriptions.Item>
                <Descriptions.Item
                    label={
                        <>
                            <ShoppingCartOutlined /> Items
                        </>
                    }
                    span={2}
                >
                    <List>
                        {(data.particulars as any[]).map((item) => {
                            return (
                                <List.Item
                                    key={item.key}
                                    actions={[
                                        <>
                                            {item.qty} {item.unit}
                                        </>,
                                    ]}
                                >
                                    {item.description}{" "}
                                    {props.showAmount ? <>{ToPeso(item.price)}</> : null}
                                </List.Item>
                            );
                        })}
                    </List>
                </Descriptions.Item>
                <Descriptions.Item
                    label={
                        <>
                            <FontSizeOutlined /> Purpose
                        </>
                    }
                >
                    {data.purpose}
                </Descriptions.Item>
            </Descriptions>
        </>
    );
};

export default PRPreview;
