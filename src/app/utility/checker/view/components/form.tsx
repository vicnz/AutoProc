"use client";

//libs
import { App, Button, Form } from "antd";
import { memo, useState } from "react";
import { useConfirm } from "@components/password-confirm";
import { action } from "../actions";
//components
import ParcelItem from "./parcel-item";
//types
type DeliveryItemsProps = {
    userId: string;
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

    const callback = async (value: boolean) => {
        setIsSaving(true);
        if (value) {
            const parsed = {
                ...form.getFieldsValue(),
            };
            parsed[`id`] = props.id;

            //append data in action
            const result = await action(JSON.stringify(parsed));
            if (result.error) {
                console.error("An Error Occurered");
                setIsSaving(false);
            } else {
                console.log("success");
                setIsSaving(false);
            }
        } else {
            setIsSaving(false);
        }
    };

    const { Component, trigger } = useConfirm(props.userId, "/utility/checker/api/confirm-password", callback);

    const onFinish = async () => {
        trigger();
        // setIsSaving(true); //loading true

        // const parsed = {
        //     ...form.getFieldsValue(),
        // };
        // parsed[`id`] = props.id;
        // //request
        // const response = await fetch(`/administrator/api/procurement/delivery?_id=${encodeURIComponent(props.id)}`, {
        //     method: "PUT",
        //     body: JSON.stringify(parsed),
        // });
        // if (response.ok) {
        //     message.info("Updated, Delivery Items");
        //     setIsSaving(false);
        // } else {
        //     message.error(`An Error Occured`);
        //     setIsSaving(false);
        // }
    };

    return (
        <>
            {Component}
            <Form initialValues={{ parcels: props.data }} form={form} onFinish={onFinish} disabled={props.final}>
                <Form.List name={"parcels"}>
                    {(fields) => (
                        <>
                            <ParcelItem fields={fields} items={props.data} />
                        </>
                    )}
                </Form.List>
                <br />
                <Button type="primary" block size="large" htmlType="submit" loading={saving}>
                    Apply
                </Button>
            </Form>
        </>
    );
};

export default memo(DeliveryItems);
