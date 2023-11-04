"use client";
import { DollarOutlined, ShopOutlined, ShoppingOutlined, TeamOutlined } from "@ant-design/icons";
//lib
import { Card, Space, Statistic, theme } from "antd";
import dayjs from "dayjs";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
const SampleChart = dynamic(async () => await import("./card.test"), {
    ssr: false,
    loading: () => <Card loading style={{ height: 300 }}></Card>,
});
//components
//states
//
const Overview = function () {
    return (
        <>
            <Space direction="vertical" style={{ width: "100%" }}>
                <div />
                <Outline />
                <div />
            </Space>
        </>
    );
};

const Outline = function () {
    return (
        <div style={{ padding: 0 }}>
            <Space wrap>
                <Card>
                    <Statistic
                        title={`Total Procured Items`}
                        value={Intl.NumberFormat("en", { notation: "compact" }).format(112893)}
                        prefix={<ShoppingOutlined />}
                        suffix={<span style={{ fontSize: ".5em" }}>({dayjs().format("YYYY")})</span>}
                    />
                </Card>
                <Card>
                    <Statistic
                        title={`Total Procured Items`}
                        value={Intl.NumberFormat("en", { notation: "compact" }).format(893)}
                        prefix={<ShoppingOutlined />}
                        suffix={<span style={{ fontSize: ".5em" }}>({dayjs().format("MMMM")})</span>}
                    />
                </Card>
                <Card>
                    <Statistic
                        title={`Total Rendered Amount`}
                        value={Intl.NumberFormat("en", { notation: "compact" }).format(349112893)}
                        prefix={<DollarOutlined />}
                        suffix={<span style={{ fontSize: ".5em" }}>({dayjs().format("YYYY")})</span>}
                    />
                </Card>
                <Card>
                    <Statistic
                        title={`Total Rendered Amount`}
                        value={Intl.NumberFormat("en", { notation: "compact" }).format(58677)}
                        prefix={<DollarOutlined />}
                        suffix={<span style={{ fontSize: ".5em" }}>({dayjs().format("MMMM")})</span>}
                    />
                </Card>
                <Card>
                    <Statistic title="Total (Active) Suppliers" value={784} prefix={<ShopOutlined />} />
                </Card>
                <Card>
                    <Statistic title="Total (Active) Users" value={784} prefix={<TeamOutlined />} />
                </Card>
            </Space>
            <br />
            <br />
            <SampleChart />
        </div>
    );
};

export default Overview;
