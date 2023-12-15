"use client";

import { ShopOutlined } from "@ant-design/icons";
import { Card, Descriptions, Divider, Modal, Space } from "antd";
import Avatar from "boring-avatars";
import { useRouter } from "next/navigation";
import EditSupplier from "./form";
import { useEffect, useState } from "react";
import DeleteSupplier from "./delete-supplier";

function SupplierItem(props: { data: any }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const onClose = () => {
        router.back();
    };
    useEffect(() => {
        setOpen(true);
    }, []);
    return (
        <Modal
            title={
                <span>
                    <ShopOutlined /> SUPPLIER INFORMATION
                </span>
            }
            open={open}
            footer={false}
            onCancel={() => onClose()}
            onOk={() => onClose()}
            centered
            width={700}
            maskClosable={false}
        >
            <Space style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "start", gap: 15 }}>
                <div>
                    <Descriptions bordered column={1} layout="vertical" size="small">
                        <Descriptions.Item label="TIN">{props.data.tin}</Descriptions.Item>
                        <Descriptions.Item label="Name">{props.data.name}</Descriptions.Item>
                        <Descriptions.Item label="Address">{props.data.address}</Descriptions.Item>
                        <Descriptions.Item label="Representative">
                            <Card style={{ boxShadow: "none", border: "none", padding: 0, margin: 0 }}>
                                <Card.Meta
                                    style={{ margin: 0, padding: 0 }}
                                    avatar={<Avatar name={props.data.representative} variant={"beam"} />}
                                    title={props.data.representative}
                                    description={props.data.position}
                                />
                            </Card>
                        </Descriptions.Item>
                    </Descriptions>
                    <Divider>Danger Section</Divider>
                    <DeleteSupplier id={props.data.id} />
                </div>
                <EditSupplier data={props.data} />
            </Space>
        </Modal>
    );
}

export default SupplierItem;
