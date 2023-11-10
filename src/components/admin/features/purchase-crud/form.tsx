"use client";

/**
 * * - PURCHASE REQUEST FORM
 * * - Purchase Request Form Where the Validation and Updating Commence
 */

import { BuildOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
    Form,
    Space,
    Input,
    DatePicker,
    Divider,
    Button,
    FormInstance,
    App,
    InputNumber,
    Skeleton,
    Tooltip,
} from "antd";
import { useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import { mutate } from "swr";
import dynamic from "next/dynamic";
//COMPONENTS
import { usePRId } from "@components/admin/procurement/purchase-id-context";

//? EDIT PARTICULARS
const EditParticulars = dynamic(async () => await import("./particulars"), { loading: () => <Skeleton.Input /> });
//? EDIT END USERS
const EditEndUsers = dynamic(async () => await import("./enduser"), {
    loading: () => <Skeleton.Input />,
});

const PRGenerator = dynamic(async () => await import("@components/admin/features/reference-num-generator"), {
    loading: () => <Skeleton.Input active />,
});

//types
interface PurchaseRequestFormProps {
    close: () => any;
    data?: any; //TODO : construct a valid type of data received
    isEdit: boolean;
    prId?: string;
}

//
const PurchaseRequestForm = function (props: PurchaseRequestFormProps) {
    const { close, data, isEdit, prId } = props;

    //PRELOAD DATA
    const preload = useMemo(() => {
        //IF DATA IS PROVIDED -> USE IT TO POPULATE THE FORM
        if (typeof data !== "undefined") {
            return { ...data, date: dayjs(data.date) }; //? POPULATE FORM WITH PRELOADED DATA
        } else {
            return { date: dayjs(), particulars: [] }; //? INIT DATA
        }
    }, [data]);

    //variables
    const prID = usePRId(); //PR ID
    const { message } = App.useApp();
    const formRef = useRef<FormInstance>(null); //Form Reference
    const [saving, setSaving] = useState(false); //Save Loading State

    //?SUBMIT DATA
    const onFinish = async () => {
        setSaving(true); //SET SAVING LOADING TO TRUE

        if (isEdit) {
            //* - UPDATE PR INFORMATION
            let response = await fetch(
                `/administrator/api/procurement/pr?_id=${encodeURIComponent(props.prId as string)}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        ...formRef.current?.getFieldsValue(),
                        date: dayjs(formRef.current?.getFieldValue("date")).toISOString(),
                    }),
                    headers: [["Content-Type", "application/json"]],
                }
            );

            //
            if (response.ok) {
                message.success("Updated Purchase Request!");
                setSaving(false);
                mutate(`/administrator/api/procurement/pr?_id=${encodeURIComponent(props.prId as string)}`); //? @REFETCH UPDATED DATA
                close();
            } else {
                setSaving(false);
                message.error("Error, Please Try Again");
            }
        } else {
            //* - CREATE NEW PR DOCUMENT
            let response = await fetch("/administrator/api/procurement/pr", {
                method: "POST",
                body: JSON.stringify({
                    ...formRef.current?.getFieldsValue(),
                    date: dayjs(formRef.current?.getFieldValue("date")).toISOString(), //PARSE DATE TO STRING
                }),
                headers: [["Content-Type", "application/json"]],
            });

            if (response.ok) {
                setSaving(false);
                message.success("Saved Procurement Record", 5);
                close(); //close modal
                mutate(`/administrator/api/procurements`); //? @REFETCH TABLE DATA
            } else {
                setSaving(false);
                message.error("Error, Please Try Again");
            }
        }
    };

    //
    return (
        <Form
            ref={formRef}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="false"
            initialValues={{ ...preload, budget: 0 }}
        >
            <Form.Item
                name="number"
                label="Purchase Request Number"
                rules={[
                    {
                        pattern: /(\d\d\d\d)-(\d\d)-[0-9]{4}/,
                        message: "Invalid PR Number Format",
                    },
                    { max: 12, message: "PR Number Format : 0000-00-0000" },
                    { required: true, message: "Required Field" },
                ]}
            >
                {isEdit ? (
                    <Input placeholder="0000-00-0000" prefix={<b>PR No.</b>} readOnly />
                ) : (
                    <PRGenerator instance={formRef} />
                )}
            </Form.Item>
            <Space style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <Form.Item
                    name="obr"
                    label="OBR"
                    rules={[
                        { max: 18, message: "Four Digit Only" },
                        { pattern: /(01|05|07|06)-(01|02|03)-\d\d\d\d-\d\d-(\d{4})/i, message: "Invalid Format" },
                        { required: true, message: "Required Field" },
                    ]}
                >
                    <Input allowClear placeholder="00-00-0000-00-0000" />
                </Form.Item>
                {/* @TODO: Inquire proper REFERENCE Id Format, limit characters based from the format */}
                <Form.Item
                    name="reference"
                    label="Reference Number"
                    rules={[{ required: true, message: "Required Field" }]}
                >
                    <Input allowClear prefix={`REF`} />
                </Form.Item>
            </Space>
            <Space
                align="start"
                style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 30%",
                }}
            >
                <div>
                    {/* SELECT END USER AWAITED */}
                    <Form.Item name="userId" label="End User" rules={[{ required: true }, { min: 1, len: 36 }]}>
                        {/**@ts-ignore */}
                        <EditEndUsers data={props?.users} />
                    </Form.Item>
                </div>
                <div>
                    {/* DATE creation of PR Document */}
                    <Form.Item name="date" label="Issued Date" rules={[{ required: true, message: "Required Field" }]}>
                        <DatePicker allowClear={false} />
                    </Form.Item>
                    {/* ABC Entry */}
                    <Form.Item hidden name="budget" label="ABC">
                        <InputNumber min={0} style={{ width: "100%" }} addonBefore={<>&#8369;</>} />
                    </Form.Item>
                </div>
            </Space>
            {/* PURCHASE REQUEST PURPOSE */}
            <Form.Item
                name="purpose"
                label="Purpose"
                rules={[
                    {
                        required: true,
                        message: "Please add a purpose to this purchase request",
                    },
                ]}
            >
                <Input.TextArea rows={8} allowClear />
            </Form.Item>
            <Divider>Particulars</Divider>
            {/* SELECT PARTICULARS */}
            <Form.Item label="Particulars" rules={[{ required: true }]} required>
                <EditParticulars />
            </Form.Item>
            <Divider />
            {/* SUBMIT BUTTON */}
            <Button block icon={<PlusCircleOutlined />} type="primary" htmlType="submit" size="large" loading={saving}>
                Save Purchase Request
            </Button>
        </Form>
    );
};

export default PurchaseRequestForm;
