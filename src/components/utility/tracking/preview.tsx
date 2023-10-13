'use client';


import { CheckOutlined } from "@ant-design/icons";
import { Space, Steps, Tag, Timeline, TimelineProps } from "antd";
import dayjs from "dayjs";
import { memo, useMemo } from "react";

///

const Routes = memo(function route(props: {
    data: Array<{ id: string; name: string; timestamp: string }>;
}) {

    //generate markdown
    const items: TimelineProps["items"] = useMemo(() => {
        return props.data.map((item) => {
            return {
                label: <>{item.name.toUpperCase()}</>,
                children: <i>{dayjs(item.timestamp).format("MM/DD/YYYY hh:mm a")}</i>,
            };
        });
    }, [props.data]);

    //
    return (
        <Space direction="vertical" style={{ width: "100%", textAlign: "left" }}>
            <Timeline items={items} mode="right" />
        </Space>
    );
});

const TrackingDisplay = (props: {
    data: Array<{ name: string; final: boolean; tracking: any[] }>;
}) => {
    const data = useMemo(() => {
        let result = props.data.map((item) => {
            return {
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
                        {item?.tracking?.length > 0 ? (
                            <Routes data={item.tracking} />
                        ) : (
                            "No Routed Office Yet"
                        )}
                    </>
                ),
            };
        });
        return result;
    }, [props.data]);
    return (
        <>
            <Steps items={data} />
        </>
    );
};

export default TrackingDisplay;
