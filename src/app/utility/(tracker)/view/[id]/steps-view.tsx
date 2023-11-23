"use client";

import { CheckOutlined } from "@ant-design/icons";
import { Space, Steps, Tag, Timeline, TimelineProps } from "antd";
import dayjs from "dayjs";
import { memo, useMemo } from "react";

///

const Routes = memo(function RouteItem(props: { data: Array<{ id: string; name: string; timestamp: string }> }) {
    //generate markdown
    const items: TimelineProps["items"] = useMemo(() => {
        return props.data.map((item) => {
            return {
                children: (
                    <span>
                        <Tag>{dayjs(item.timestamp).format("MM/DD/YY hh:mm a")}</Tag>
                        <br />
                        <span style={{ whiteSpace: "normal", fontSize: "0.8em" }}>{item.name.toUpperCase()}</span>
                        <br />
                    </span>
                ),
            };
        });
    }, [props.data]);

    //
    return (
        <Space direction="vertical" style={{ width: "100%", textAlign: "left" }}>
            <Timeline items={items} mode="left" />
        </Space>
    );
});

const TrackingDisplay = (props: { data: Array<{ name: string; final: boolean; tracking: any[] }> }) => {
    const data = useMemo(() => {
        return props.data.map((item, idx) => {
            const status = (props.data[--idx]?.final || false) && !props.data[idx++]?.final;
            return {
                status: status ? "process" : item.final ? "finish" : "wait",
                title: (
                    <Space
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            gap: 10,
                            alignItems: "center",
                        }}
                    >
                        <span>{item.name.toUpperCase()}</span>
                        {item?.final ? (
                            <Tag color="green">
                                <CheckOutlined /> Completed
                            </Tag>
                        ) : null}
                    </Space>
                ),
                description: (
                    <>
                        <br />
                        {item?.tracking?.length > 0 ? <Routes data={item.tracking} /> : "No Routed Office Yet"}
                    </>
                ),
            };
        });
    }, [props.data]);
    return (
        <>
            <Steps items={data as any} />
        </>
    );
};

export default TrackingDisplay;
