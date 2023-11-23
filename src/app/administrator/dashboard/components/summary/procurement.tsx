"use client";

import { BarChartOutlined } from "@ant-design/icons";
import { Card, CardProps, Result, Skeleton } from "antd";
import { ChartOptions } from "chart.js";
import dayjs from "dayjs";
import { memo } from "react";
import { Bar } from "react-chartjs-2";
import useSWR from "swr";

// const sampleDataSet = () => {
//     const dataset: any = [];
//     const list = new Array(12).fill(0);
//     dataset[0] = {
//         id: "sample-data-set",
//         label: "Completed",
//         data: list.map((item) => randomRange(25, 300)),
//         borderColor: "#C0252A",
//         fill: true,
//         tension: 0.3,
//         backgroundColor: "#C0252A60",
//         pointRadius: 5,
//         pointHoverRadius: 10,
//     };
//     return dataset;
// };

const options: ChartOptions = {
    responsive: true,
    aspectRatio: 2,
};

const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function ProcurementRendered(props: CardProps & { height: number | string }) {
    const { data, isLoading, error } = useSWR("/administrator/dashboard/api/summary", { refreshInterval: 30 * 60 });
    const { height, ...rest } = props;

    if (error) {
        return (
            <Card style={{ height }}>
                <Result status="error" title="Failed To Fetch Data" />
            </Card>
        );
    }

    if (!data || isLoading) {
        return (
            <Card style={{ height }} loading>
                <Skeleton active />
            </Card>
        );
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
            extra={<>Current Year : {dayjs().get("year")}</>}
        >
            <Bar
                options={{ ...options, scales: { y: { min: 0 } } }}
                data={{
                    labels: Months,
                    datasets: [
                        {
                            label: "Purchase Requests",
                            data: result.map((item: { count: number }) => item?.count),
                            borderColor: "#C0252A",
                            backgroundColor: "#C0252A60",
                        },
                    ],
                }}
                datasetIdKey="id"
            />
            {/* <Line
                options={{ ...options, scales: { y: { min: 0 } } }}
                data={{
                    labels: Months,
                    datasets: [
                        {
                            label: "Purchase Requests",
                            data: result.map((item: { count: number }) => item?.count),
                            borderColor: "#C0252A",
                            fill: true,
                            tension: 0.3,
                            backgroundColor: "#C0252A60",
                            pointRadius: 5,
                            pointHoverRadius: 10,
                        },
                    ],
                }}
                datasetIdKey="id"
            /> */}
        </Card>
    );
}

export default memo(ProcurementRendered);
