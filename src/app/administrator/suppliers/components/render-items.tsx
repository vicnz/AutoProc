"use client";

import { Button, Card, List, Progress, Space, Statistic, Tag } from "antd";
import Avatar from "boring-avatars";
import { memo } from "react";
import { motion } from "framer-motion";
import { EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { PrismaModels } from "@lib/db";

function RenderSupplierList(props: { data: Partial<PrismaModels["suppliers"]>[] }) {
    return (
        <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={props.data}
            renderItem={(item: any, idx) => (
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
                        >
                            <Card.Meta
                                avatar={<Avatar name={item.name} variant="bauhaus" />}
                                title={item.name}
                                description={
                                    <span>
                                        Electronics & Appliciances <Tag>TODO</Tag>
                                    </span>
                                }
                            />
                            <br />
                            <Space
                                style={{ width: "100%", display: "grid", gridTemplateColumns: "40% 1fr" }}
                                size="middle"
                            >
                                <Statistic
                                    title="Total (Items)"
                                    value={Intl.NumberFormat("en", { notation: "compact" }).format(94)}
                                />
                                <Statistic
                                    title="Selection Chance"
                                    value={67}
                                    valueRender={() => (
                                        <>
                                            <Progress percent={87} />
                                        </>
                                    )}
                                />
                            </Space>
                        </Card>
                    </List.Item>
                </motion.div>
            )}
        />
    );
}

export default memo(RenderSupplierList);
