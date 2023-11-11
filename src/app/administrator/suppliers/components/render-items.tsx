"use client";

import { Button, Card, Divider, List, Progress, Space, Statistic, Tag, Tooltip } from "antd";
import Avatar from "boring-avatars";
import { memo, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpOutlined, EyeOutlined, LineChartOutlined } from "@ant-design/icons";
import Link from "next/link";
import { PrismaModels } from "@lib/db";
import { Chart as ChartJs, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

function RenderSupplierList(props: { data: Partial<PrismaModels["suppliers"]>[] }) {
    useEffect(() => {
        ChartJs.register(...registerables);
    }, []);

    return (
        <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={props.data}
            renderItem={(item: any, idx) => {
                return (
                    <motion.div
                        key={item.tin}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{
                            delay: ((idx + 1) * 10) / 100,
                        }}
                    >
                        <List.Item key={item.tin}>
                            <Card
                                title={<span style={{ fontSize: "0.8em" }}>{item.tin}</span>}
                                extra={
                                    <>
                                        <Link href={`/administrator/suppliers/${encodeURIComponent(item.id)}`} passHref>
                                            <Button icon={<EyeOutlined />}>Details</Button>
                                        </Link>
                                    </>
                                }
                                actions={[
                                    <Tooltip title="On-Time Deliveries" key="on-time">
                                        {Intl.NumberFormat("en", { notation: "compact" }).format(item.onTime || 0)}{" "}
                                        On-Time
                                    </Tooltip>,
                                    <Tooltip title="Delayed Deliveries" key="delays">
                                        {Intl.NumberFormat("en", { notation: "compact" }).format(item.delays || 0)}{" "}
                                        Delays
                                    </Tooltip>,
                                    <Tooltip title="Deliveries Extended Deadlines" key="extension">
                                        {Intl.NumberFormat("en", { notation: "compact" }).format(item.extend || 0)}{" "}
                                        Extended
                                    </Tooltip>,
                                ]}
                            >
                                <Card.Meta
                                    avatar={<Avatar name={item.name} variant="bauhaus" />}
                                    title={item.name}
                                    description={<span>{item.representative}</span>}
                                />
                                <br />
                                <Statistic
                                    suffix={<LineChartOutlined />}
                                    title="Selection Count"
                                    value={Intl.NumberFormat("en", { notation: "compact" }).format(item.selection || 0)}
                                />
                            </Card>
                        </List.Item>
                    </motion.div>
                );
            }}
        />
    );
}

export default memo(RenderSupplierList);
