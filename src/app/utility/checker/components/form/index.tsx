"use client";

import { Button, Form } from "antd";
import React, { useState } from "react";
import SearchComponent from "./searchpo";
import { useRouter } from "next/navigation";
// ─────────────────────────────────────────────────────────────────────────────
function SelectPO() {
    const { push } = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async () => {
        setLoading(true);
        const data = form.getFieldValue("delivery-id");
        push(`/utility/checker/view?id=${encodeURIComponent(data.value)}`);
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item name="delivery-id" rules={[{ required: true }]}>
                <SearchComponent />
            </Form.Item>
            <Button block type="primary" size="large" loading={loading} htmlType="submit">
                Check Deliveries
            </Button>
        </Form>
    );
}

export default SelectPO;
