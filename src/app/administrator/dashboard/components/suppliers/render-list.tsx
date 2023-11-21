"use client";

import { Empty, List, Card, Avatar, Space, Button } from "antd";
import LoadingButton from "@components/loading-btn";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";
type ResponseType = {
    delays: number;
    extends: number;
    selection: number;
    onTime: number;
    supplier: {
        id: string;
        name: string;
        tin: string;
    };
};

const RenderTopSuppliers = (props: { data: ResponseType[] }) => {
    if (props.data.length < 1) {
        return <Empty />;
    }
    return (
        <List
            itemLayout="horizontal"
            dataSource={props.data}
            renderItem={(item: ResponseType, idx: number) => {
                return (
                    <List.Item
                        key={item.supplier.id}
                        extra={
                            <>
                                <Link href={`/administrator/suppliers/${item.supplier.id}`} passHref>
                                    <LoadingButton icon={<ArrowRightOutlined />} type="text" />
                                </Link>
                            </>
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar>{idx + 1}</Avatar>}
                            title={
                                <>
                                    <Space>
                                        <span>{item.supplier.name}</span>
                                        <Button size="small" style={{ pointerEvents: "none" }} type="primary">
                                            Selection : {item.selection}
                                        </Button>
                                    </Space>
                                </>
                            }
                            description={
                                <>
                                    <Space>
                                        <Button size="small" style={{ pointerEvents: "none" }}>
                                            OnTime : {item.onTime}
                                        </Button>
                                        <Button size="small" style={{ pointerEvents: "none" }}>
                                            Extends : {item.extends}
                                        </Button>
                                        <Button size="small" style={{ pointerEvents: "none" }}>
                                            Delays : {item.delays}
                                        </Button>
                                    </Space>
                                </>
                            }
                        />
                        <br />
                    </List.Item>
                );
            }}
        />
    );
};

export default RenderTopSuppliers;
