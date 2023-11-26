"use client";

import { CalendarOutlined, NumberOutlined, ShopOutlined } from "@ant-design/icons";
import { Card, Descriptions, Progress, Space, theme } from "antd";
import dayjs from "dayjs";

function PODetails(props: { data: any }) {
    const { progress, status, startDate, endDate, number, supplier } = props.data;
    const { name, address } = supplier;
    const { token } = theme.useToken();
    return (
        <Card title="PO Information" bodyStyle={{ padding: 0 }}>
            <Space direction="vertical" style={{ width: "100%" }} size="middle">
                <div
                    style={{
                        display: "grid",
                        placeItems: "center",
                        // padding: "5px 25px",
                        // width: "250px",
                    }}
                >
                    <br />
                    <Progress percent={progress} type="dashboard" strokeColor={token.colorPrimary} />
                    <span
                        style={{
                            // color: `${isDelayed ? "red" : ""}`,
                            fontSize: "1.2em",
                        }}
                    >
                        {status}
                    </span>
                </div>
                <Descriptions size="small" bordered column={1} style={{ width: "100%" }}>
                    <Descriptions.Item
                        label={
                            <span>
                                <CalendarOutlined /> Notice
                            </span>
                        }
                    >
                        {dayjs(startDate).format("MMMM DD, YYYY")}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            <span>
                                <CalendarOutlined /> Deadline
                            </span>
                        }
                    >
                        {dayjs(endDate).format("MMMM DD, YYYY")}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            <span>
                                <NumberOutlined /> PO #
                            </span>
                        }
                    >
                        {number}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            <span>
                                <ShopOutlined /> Supplier
                            </span>
                        }
                    >
                        {name}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            <span>
                                <NumberOutlined /> Address
                            </span>
                        }
                    >
                        {address}
                    </Descriptions.Item>
                </Descriptions>
            </Space>
        </Card>
    );
}

export default PODetails;
