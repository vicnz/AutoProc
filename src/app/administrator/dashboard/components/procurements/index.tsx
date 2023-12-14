"use client";

import { BarChartOutlined } from "@ant-design/icons";
import { Card, CardProps } from "antd";
import dayjs from "dayjs";
import { memo } from "react";
import useSWR from "swr";

import Graph from "./chart";
import { Loading, Error } from "../status";

function ProcurementRendered(props: CardProps & { height: number }) {
    const { data, isLoading, error } = useSWR("/administrator/dashboard/api/summary", { refreshInterval: 30 * 60 });
    const { height, ...rest } = props;

    if (error) {
        return (
            <Error height={height}>
                <BarChartOutlined /> Procurements (SVP)
            </Error>
        );
    }

    if (!data || isLoading) {
        return <Loading height={height} />;
    }

    const { data: result } = data;
    return (
        <Card
            {...rest}
            style={{ height }}
            title={
                <>
                    <BarChartOutlined /> Procurements (SVP)
                </>
            }
            extra={<>{dayjs().get("year")}</>}
        >
            <Graph data={result} />
        </Card>
    );
}

export default memo(ProcurementRendered);
