"use client";

import { BlockOutlined } from "@ant-design/icons";
import { randomRange } from "@lib/client/random-range";
import { Card, CardProps, Result, Skeleton, Tag } from "antd";
import dayjs from "dayjs";
import { Doughnut } from "react-chartjs-2";
import useSWR from "swr";

//? TEST DATA
const demoData = {
    data: new Array(4).fill(0).map((item) => randomRange(25, 300)),
};
//? TEST DATA

function Ratio(props: CardProps & { height: number }) {
    const { data, error, isLoading } = useSWR("/administrator/dashboard/api/ratio", { refreshInterval: 30 * 60 });
    const { height, ...rest } = props;

    if (error) {
        return (
            <Card {...rest} style={{ height }}>
                <Result status="error" title="Failed To Fetch Data" />
            </Card>
        );
    }

    if (!data || isLoading) {
        return (
            <Card
                title={
                    <>
                        <BlockOutlined /> Procurement Type Ratio <Tag color="orange">ALPHA</Tag>
                    </>
                }
                style={{ height }}
                loading
            >
                <Skeleton active />
            </Card>
        );
    }

    const { data: result, types } = data;
    return (
        <>
            <Card
                style={{ height }}
                title={
                    <>
                        <BlockOutlined /> Procurement Type Ratio <Tag color="orange">ALPHA</Tag>
                    </>
                }
                extra={<>Current Year {dayjs().get("year")}</>}
            >
                <Doughnut
                    options={{
                        responsive: true,
                        aspectRatio: 2,
                        plugins: {
                            legend: {
                                align: "center",
                                position: "left",
                            },
                        },
                    }}
                    data={{
                        labels: types,
                        datasets: [
                            {
                                label: "Procured Types",
                                // data: (result as any[]).map((item) => item.count),
                                data: demoData.data,
                            },
                        ],
                    }}
                    datasetIdKey="id"
                />
            </Card>
        </>
    );
}

export default Ratio;
