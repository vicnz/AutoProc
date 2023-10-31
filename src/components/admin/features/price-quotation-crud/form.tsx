"use client";

/**
 * * - EDIT PRICE QUOTATION [FORM]
 * * - Preloaded By Data
 */

import { SaveOutlined } from "@ant-design/icons";
import { App, Button, DatePicker, Divider, Form, Select, Skeleton } from "antd";
import dayjs from "dayjs";
import { memo, useMemo, useState } from "react";
import dynamic from "next/dynamic";

//Supplier Management
const SupplierManagement = dynamic(
    async () => await import("@components/admin/features/suppliers-crud"),
    { loading: () => <Skeleton.Input active /> }
);
//TYPES
interface RequestForQuotationFormProps {
    data: any; //TODO : create a genuine type
    suppliers: any[]; //TODO : create a gnuine type
    close: () => any;
}
//
const RequestForQuotationForm = function (props: RequestForQuotationFormProps) {
    //
    const { suppliers } = props;
    const { id } = props.data;

    const { message } = App.useApp();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    //PRELOAD DATA
    const sanitizedData = useMemo(
        () => ({
            ...props.data,
            date: dayjs(props.data.date), //CONVERT STRING DATE TO DAYJS OBJECT
            suppliers: (props.data.suppliers as any[]).map((item) =>
                JSON.stringify({ ...item })
            ), //!REQUIRED to be Stringified
        }),
        [props.data]
    );

    //SUBMIT DATA
    const onFinish = async () => {
        setLoading(true);

        //PARSE DATA
        const parsed = {
            ...form.getFieldsValue(),
            date: dayjs(form.getFieldValue("date")).toISOString(), //CONVERT DATE OBEJECT TO STRING
            //CONVERT SELECTED SUPPLIERS "STRING" to JSON Object
            suppliers: Array.from(
                new Set(
                    form
                        .getFieldValue("suppliers")
                        .map((item: string) => JSON.parse(item))
                )
            ),
        };

        //PUSH DATA
        const result = await fetch(`/administrator/api/procurement/rfq?_id=${encodeURIComponent(id)}`, {
            method: "PUT",
            body: JSON.stringify(parsed),
            headers: [["Content-Type", "application/json"]],
        });

        if (result.ok) {
            setLoading(false);
            message.success("Updated Request For Quotation");
            props.close();
        } else {
            setLoading(false);
            message.error("Error, Please Try Again");
        }
    };

    return (
        <>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                initialValues={sanitizedData}
            >
                {/* SELECT DATE */}
                <Form.Item label="Date" name="date">
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                {/* SELECT SUPPLIERS */}
                <Form.Item name="suppliers" label="Suppliers">
                    <Select
                        allowClear
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Select Suppliers"
                        options={(suppliers as any).map((item: any) => ({
                            key: item.id,
                            label: item.name,
                            value: JSON.stringify({ id: item.id, name: item.name }),
                        }))}
                    />
                </Form.Item>
                {/* TODO */}
                <SupplierManagement isEdit={false} buttonProps={{ block: true }}>
                    Add New Supplier
                </SupplierManagement>
                {/*TODO*/}
                <Divider />
                <Button
                    block
                    type="primary"
                    size="large"
                    icon={<SaveOutlined />}
                    htmlType="submit"
                    loading={loading}
                >
                    Update RFQ Document
                </Button>
            </Form>
        </>
    );
};

export default memo(RequestForQuotationForm);
