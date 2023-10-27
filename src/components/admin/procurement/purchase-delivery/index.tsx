"use client";
//libs
import { CSSProperties } from "react";
//components
import SubHeader from "@components/admin/procurement/subheader"; //Subheader
import {
    Button,
    Card,
    Checkbox,
    Collapse,
    Descriptions,
    List,
    Progress,
    Skeleton,
    Tooltip,
} from "antd";
import dayjs from "dayjs";
import {
    CalendarOutlined,
    MinusOutlined,
    NumberOutlined,
    PlusOutlined,
    SaveOutlined,
    ShopOutlined,
} from "@ant-design/icons";
import useSWR from "swr";
import { usePRId } from "../../PRId";
import NetworkError from "@components/admin/network-error";
import RequireFinal from "./requirefinal";
import CreateNewDelivery from "./create";
import MakeFinal from "./final";
//configs
const WrapperStyles: CSSProperties = {
    display: "grid",
    gridTemplateRows: "56px 1fr",
    width: "100%",
    height: "calc(100vh - 112px)",
};
//
const DeliveryView = function () {
    const id = usePRId();
    const { data, isLoading, isValidating, error } = useSWR(
        `/administrator/api/delivery?_id=${id}`
    );

    if (error) {
        return (
            <NetworkError
                title="Failed To Load Delivery Information"
                subTitle="Please Reload Page or Try Again Later"
            />
        );
    }

    if (!data || isLoading) {
        return <Skeleton active />;
    } else {
        if (data.requiredFinal === true) {
            return (
                <RequireFinal
                    title="Required Purchase Order to be Final"
                    subTitle="Purchase Order required to be final first"
                />
            );
        }

        if (data.empty === true) {
            return <CreateNewDelivery />;
        } else {
            const { startDate, endDate, number, supplier } = data;
            const { name, address } = supplier;

            let deliveryStatus = "";
            let isDelayed = false;
            if (dayjs(endDate) <= dayjs()) {
                isDelayed = true;
                deliveryStatus = `${Math.abs(
                    dayjs(endDate).diff(dayjs(), "day")
                )} Day(s) Delayed`;
            } else {
                isDelayed = false;
                deliveryStatus = `${Math.abs(
                    dayjs(endDate).diff(dayjs(), "day")
                )} Day(s) Remaining`;
            }

            return (
                <>
                    <div style={WrapperStyles}>
                        {/* SUBHEADER */}
                        <SubHeader leading={"Delivery"}>
                            <MakeFinal />
                        </SubHeader>
                        {/* SUBHEADER */}
                        <div
                            style={{
                                position: "relative",
                                height: "calc(100vh - 168px)",
                                width: "100%",
                                overflowY: 'auto'
                            }}
                        >
                            <div
                                style={{
                                    padding: "10px 0",
                                    height: "auto",
                                    width: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    display: "grid",
                                    gridTemplateColumns: "40% 1fr",
                                    gap: 15,
                                }}
                            >
                                <Card
                                    title="Delivery Status"
                                    cover={
                                        <div
                                            style={{
                                                display: "grid",
                                                placeItems: "center",
                                                padding: 10,
                                            }}
                                        >
                                            <br />
                                            <Tooltip title="2 done / 1 in progress / 4 to go">
                                                <Progress
                                                    percent={50}
                                                    success={{ percent: 30 }}
                                                    type="dashboard"
                                                />
                                            </Tooltip>
                                            <span
                                                style={{
                                                    color: `${isDelayed ? "red" : ""}`,
                                                    fontSize: "1.2em",
                                                }}
                                            >
                                                {deliveryStatus}
                                            </span>
                                        </div>
                                    }
                                >
                                    <Descriptions
                                        bordered
                                        size="small"
                                        layout="vertical"
                                        column={2}
                                    >
                                        <Descriptions.Item
                                            label={
                                                <span>
                                                    <NumberOutlined /> PO Number
                                                </span>
                                            }
                                            span={2}
                                        >
                                            {number}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            label={
                                                <span>
                                                    <CalendarOutlined /> Notice
                                                </span>
                                            }
                                            span={1}
                                        >
                                            {dayjs(startDate).format("MMMM DD, YYYY")}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            label={
                                                <span>
                                                    <CalendarOutlined /> Deadline
                                                </span>
                                            }
                                            span={1}
                                        >
                                            {dayjs(endDate).format("MMMM DD, YYYY")}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            label={
                                                <span>
                                                    <ShopOutlined /> Supplier
                                                </span>
                                            }
                                            span={2}
                                        >
                                            {name}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            label={
                                                <span>
                                                    <NumberOutlined /> Address
                                                </span>
                                            }
                                            span={2}
                                        >
                                            {address}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                                <Card
                                    title="Items"
                                    extra={
                                        <Button icon={<SaveOutlined />} type="text">
                                            Update
                                        </Button>
                                    }
                                >
                                    <CollapseItems />
                                </Card>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
};

export default DeliveryView;

const CollapseItems = function () {
    const items = new Array(3).fill(0).map((item, idx) => {
        return {
            key: idx + 1,
            label: "Particular Item",
            children: (
                <>
                    <List header={<Checkbox>Check All</Checkbox>}>
                        <List.Item
                            key="checked1"
                            actions={[
                                <Button.Group key={'checked2'}>
                                    <Button icon={<MinusOutlined />} />
                                    <Button style={{ pointerEvents: "none" }}>{3}</Button>
                                    <Button icon={<PlusOutlined />} />
                                </Button.Group>,
                            ]}
                        >
                            <Checkbox>Delivered Items?</Checkbox>
                        </List.Item>
                        <List.Item key="checked2">
                            <Checkbox>Quality Checked?</Checkbox>
                        </List.Item>
                        <List.Item key="checked3">
                            <Checkbox>Authenticity Checked??</Checkbox>
                        </List.Item>
                    </List>
                </>
            ),
        };
    });

    return (
        <>
            <Collapse items={items} accordion expandIconPosition="end" />
        </>
    );
};
