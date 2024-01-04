"use client";

import { BlockOutlined } from "@ant-design/icons";
import { Card, CardProps, DatePicker, Tag } from "antd";
import dayjs from "dayjs";
import useSWR from "swr";

import Graph from "./chart";
import { Loading, Error } from "../status";
import { useState } from "react";

function Ratio(props: CardProps & { height: number }) {
    const [year, setYear] = useState(dayjs().get('year'))
    const { data, error, isLoading } = useSWR(`/administrator/dashboard/api/ratio?year=${year}`, { refreshInterval: 30 * 60 });
    const { height, ...rest } = props;

    if (error) {
        return (
            <Error height={height}>
                <BlockOutlined /> Proc Type Ratio
            </Error>
        );
    }

    if (!data || isLoading) {
        return <Loading height={height} />;
    }

    const { data: result } = data;
    return (
        <>
            <Card
                style={{ height }}
                title={
                    <>
                        <BlockOutlined /> Proc Type Ratio <Tag color="orange">PREVIEW</Tag>
                    </>
                }
                extra={
                    <>
                        <DatePicker.YearPicker value={dayjs().set('year', year)} onChange={(e) => setYear(e?.get('year') as number)} />
                    </>
                }
            >
                <Graph data={result} />
            </Card>
        </>
    );
}

export default Ratio;
