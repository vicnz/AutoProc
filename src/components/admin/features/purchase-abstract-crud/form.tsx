"use client";

/**
 * * - ABSTRACT CRUD [FORM]
 * * - Manage Abstract Quotation Items
 */

import { SaveOutlined } from "@ant-design/icons";
import { Alert, App, Button, DatePicker, Divider, Form, Input, Skeleton, Space } from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
//SELECT LOWEST BIDDER
const SelectLowestBidder = dynamic(async () => await import("./select-lowest-bidder"), {
    loading: () => <Skeleton.Input />,
});
//PREVIEW PURCHASE REQUEST
const PurchaseRequestPreview = dynamic(async () => await import("@components/admin/features/pr-mini-preview"), {
    loading: () => <Skeleton active />,
});

import QuotationEdit from "./quotations";
import { usePRId } from "@components/admin/procurement/purchase-id-context";
//
//type
interface AbstractQuotationFormProps {
    data: any; //TODO : create a genuine type
    close: () => any;
}
//
const AbstractQuotationForm = function (props: AbstractQuotationFormProps) {
    const prID = usePRId();
    const { id, lowestBidder, location, quotations, date, suppliers } = props.data;

    const [loading, setLoading] = useState(false); //save loading...
    const { message } = App.useApp();
    const [form] = Form.useForm();

    //preloaded data
    const preloadedData = useMemo(() => {
        return {
            ...props.data,
            id: id,
            date: dayjs(date),
            //parse quotations
            quotations: (quotations as any[]).map((item) => {
                const { id, supplier, total, ...rest } = item;
                return {
                    id,
                    supplier,
                    total,
                    particulars: Object.entries(rest).map((item) => ({
                        description: item[0],
                        total: item[1],
                    })),
                };
            }),
        };
    }, [date, id, quotations, props.data]);

    //SUBMIT FORM
    const onFinish = async () => {
        setLoading(true);

        const parsed = {
            ...form.getFieldsValue(),
            id: id,
            date: dayjs(form.getFieldValue("date")).toISOString(), //CONVERT DATE TO STRING
        };
        //PUSH DATA
        const sendUpdate = await fetch(`/administrator/api/procurement/abstract?_id=${encodeURIComponent(id)}`, {
            method: "PUT",
            body: JSON.stringify(parsed),
            headers: [["Content-Type", "application/json"]],
        });

        if (sendUpdate.ok) {
            setLoading(false);
            message.success("Saved Abstract Quotation");
            props.close();
        } else {
            setLoading(false);
            message.error("Error, Please Try Again");
        }
    };
    return (
        <>
            <Form layout="vertical" initialValues={preloadedData} form={form} onFinish={onFinish}>
                <PurchaseRequestPreview showAmount />
                <Divider>Abstracts</Divider>
                <Space>
                    <Form.Item label="Place of Bidding" name="location">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Date" name="date">
                        <DatePicker />
                    </Form.Item>
                </Space>
                <br />
                <Alert
                    showIcon={false}
                    banner
                    closeIcon={null}
                    closable={false}
                    type="info"
                    message="Enter The Total Quotationed"
                    description={
                        <>
                            Enter the <strong>Total</strong> price offered (<i>quantity &times; offered unit-price</i>).
                        </>
                    }
                />
                <br />
                <Form.List name="quotations">
                    {(fields) => <QuotationEdit fields={fields} quotations={preloadedData.quotations} />}
                </Form.List>
                <br />
                {/* SELECT LOWEST BIDDER */}
                <Form.Item label="Lowest Bidder" name="lowestBidder">
                    <SelectLowestBidder data={suppliers} />
                </Form.Item>
                {/* SUBMIT */}
                <Button htmlType="submit" type="primary" icon={<SaveOutlined />} size="large" block loading={loading}>
                    Save Abstract
                </Button>
            </Form>
        </>
    );
};

export default AbstractQuotationForm;
