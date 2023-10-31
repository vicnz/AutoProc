"use client";

/**
 * * RENDER STATUS
 * * THIS COMPONENT DISPLAYS THE
 * * CURRENT DELIVERY STATUS
 */

//libs
import { NumberOutlined, CalendarOutlined, ShopOutlined } from "@ant-design/icons";
import { Card, Space, Progress, Descriptions, theme, Skeleton, Divider } from "antd";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { memo } from "react";
//components
const ExtendDelivery = dynamic(async () => await import("./extend"), { loading: () => <Skeleton.Button /> });
//types
type DeliveryStatusProps = {
    endDate: string;
    number: string;
    startDate: string;
    id: string;
    supplier: string;
    address: string;
    progress: any;
    final: boolean;
};
///
const DeliveryStatus = function (props: DeliveryStatusProps) {
    const { token } = theme.useToken();
    const { endDate, number, startDate, supplier: name, address, progress, id, final } = props;

    //TODO migrate this in server code
    let deliveryStatus = "";
    let isDelayed = false;
    if (final) {
        isDelayed = false;
        deliveryStatus = "Completed";
    } else if (dayjs(endDate) <= dayjs()) {
        isDelayed = true;
        deliveryStatus = `${Math.abs(
            dayjs(endDate).diff(dayjs(), "day") //TODO Compare Date from Server Time
        )} Day(s) Delayed`;
    } else {
        isDelayed = false;
        deliveryStatus = `${Math.abs(
            dayjs(endDate).diff(dayjs(), "day") //TODO Compare Date from Server Time
        )} Day(s) Remaining`;
    }

    return (
        <>
            <Card
                title="DELIVERY STATUS"
                extra={
                    <Space>
                        <div style={{ color: token.colorPrimary }}>
                            Extend <strong>Deadline</strong> Date
                        </div>
                        <Divider type="vertical" />
                        <ExtendDelivery
                            final={final}
                            number={number}
                            id={id}
                            deliveryStatus={deliveryStatus}
                            endDate={endDate}
                            startDate={startDate}
                        />
                    </Space>
                }
            >
                <Space style={{ display: "flex", width: "100%" }} size="middle">
                    <div
                        style={{
                            display: "grid",
                            placeItems: "center",
                            padding: "5px 25px",
                            width: "250px",
                        }}
                    >
                        <br />
                        <Progress percent={progress} type="dashboard" strokeColor={token.colorPrimary} />
                        <span
                            style={{
                                color: `${isDelayed ? "red" : ""}`,
                                fontSize: "1.2em",
                            }}
                        >
                            {deliveryStatus}
                        </span>
                    </div>
                    <Descriptions column={2} style={{ width: "100%" }}>
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
                                    <NumberOutlined /> PO Number
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
        </>
    );
};

export default memo(DeliveryStatus);
