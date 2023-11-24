"use client";

/**
 * * RENDER PARCEL DELIVERY ITEM EDITOR
 * * RENDER DELIVERY ITEMS
 */

//libs
import { SaveOutlined, ShoppingOutlined } from "@ant-design/icons";
import { App, Button, Card, Divider, Form, Space, theme } from "antd";
import { memo, useState } from "react";
//components
import ParcelItem from "./parcel";
//types
type DeliveryItemsProps = {
    id: any;
    final: boolean;
    data: Array<{
        id: string;
        qty: number;
        price: number;
        total: number;
        description: string;
        remarks: any;
        completed: boolean;
        verified: { aligned: boolean; count: number; quality: boolean };
    }>;
};
///
const DeliveryItems = function (props: DeliveryItemsProps) {
    const [saving, setIsSaving] = useState(false); //loading state
    const [form] = Form.useForm(); //form instance
    const { message } = App.useApp(); //message fn
    const { token } = theme.useToken(); //theme token

    /**
     * UPDATE CURRENT CHECKED ITEMS
     */
    const onFinish = async () => {
        setIsSaving(true); //loading true

        const parsed = {
            ...form.getFieldsValue(),
        };
        parsed[`id`] = props.id;
        //request
        const response = await fetch(`/administrator/api/procurement/delivery?_id=${encodeURIComponent(props.id)}`, {
            method: "PUT",
            body: JSON.stringify(parsed),
        });
        if (response.ok) {
            message.info("Updated, Delivery Items");
            setIsSaving(false);
        } else {
            message.error(`An Error Occured`);
            setIsSaving(false);
        }
    };

    return (
        <>
            <Form initialValues={{ parcels: props.data }} form={form} onFinish={onFinish} disabled={props.final}>
                <Card
                    loading={saving}
                    title={
                        <span>
                            ITEMS <Divider type="vertical" />
                            <ShoppingOutlined /> {props.data.length}
                        </span>
                    }
                    extra={
                        <Space>
                            <div style={{ color: token.colorPrimary }}>
                                Always <strong>Save</strong> When Done Checking{" "}
                            </div>
                            <Divider type="vertical" />
                            <Button icon={<SaveOutlined />} htmlType="submit" loading={saving}>
                                Apply
                            </Button>
                        </Space>
                    }
                >
                    <Form.List name={"parcels"}>
                        {(fields) => (
                            <>
                                <ParcelItem fields={fields} items={props.data} />
                            </>
                        )}
                    </Form.List>
                </Card>
            </Form>
        </>
    );
};

export default memo(DeliveryItems);
