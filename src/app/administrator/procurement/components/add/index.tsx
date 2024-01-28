'use client';

import { PlusCircleOutlined } from '@ant-design/icons'
import { App, Button, DatePicker, Divider, Form, FormInstance, Input, InputNumber, Space, message } from 'antd'
import React, { useRef, useState } from 'react'

//Components
import PRGen from './num-gen'
import SelectUser from './select-user'
import Particulars from './particulars'

//server action
import { submitPurchaseOrder } from './server'
import dayjs from 'dayjs';

function AddNewPr() {
    const [loading, setLoading] = useState(false)
    const { message } = App.useApp()
    const [form] = Form.useForm()
    const formInstance = useRef<FormInstance>(null);
    //
    const onFinish = async () => {
        const data = form.getFieldsValue()
        setLoading(true)
        try {
            const result = await submitPurchaseOrder({ ...data, date: dayjs(data.date).toISOString() })
            if (result.error) throw "Server Error";
            message.error("Saved Procurement Record");
        } catch (err) {
            message.error("Server Error Please Try Again");
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="false"
                ref={formInstance}
            // initialValues={{ ...preload, budget: 0 }}
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
                    <PRGen instance={formInstance} />
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
                            <SelectUser instance={formInstance} />
                            {/* <EditEndUsers data={props?.users} isEdit={isEdit} /> */}
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
                    <Particulars />
                </Form.Item>
                <Divider />
                {/* SUBMIT BUTTON */}
                <Button block icon={<PlusCircleOutlined />} type="primary" htmlType="submit" size="large" loading={loading}>
                    Save Purchase Request
                </Button>
            </Form>
        </>
    )
}

export default AddNewPr