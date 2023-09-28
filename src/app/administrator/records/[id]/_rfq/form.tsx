'use client';

import { MinusCircleOutlined, PlusCircleOutlined, SaveOutlined, ShopOutlined } from '@ant-design/icons';
import { App, Button, DatePicker, Divider, Form, Input, Popconfirm, Popover, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { memo, useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

const { useApp } = App
const { useForm } = Form
const RequestForQuotationForm = function (props: { data: any, suppliers: any[], close: () => any }) {
    const { message } = useApp()
    const [form] = useForm()
    const [loading, setLoading] = useState(false)

    const sanitizedData = useMemo(() => ({
        ...props.data,
        date: dayjs(props.data.date),
        suppliers: (props.data.suppliers as any[]).map(item => JSON.stringify({ ...item }))
    }), [props.data])



    const onFinish = async () => {
        setLoading(true)
        const parsed = {
            ...form.getFieldsValue(),
            date: dayjs(form.getFieldValue('date')).toISOString(),
            suppliers: Array.from(new Set(form.getFieldValue('suppliers').map((item: string) => JSON.parse(item))))
        }

        const result = await fetch(`/administrator/api/records/rfq?_id=${props.data.id}`, {
            method: 'PUT',
            body: JSON.stringify(parsed),
            headers: [['Content-Type', 'application/json']]
        })

        if (result.ok) {
            setLoading(false)
            message.info('Updated Record')
            props.close()
        } else {
            setLoading(false)
            message.error("Server Error")
        }

    }


    return (
        <>
            <Form layout='vertical' form={form} onFinish={onFinish} initialValues={sanitizedData} disabled={props.data.final}>
                <Form.Item label="Date" name="date">
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="suppliers" label="Suppliers">
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select Suppliers"
                        options={
                            (props?.suppliers as any).map((item: any) => ({
                                key: item.id,
                                label: item.name,
                                value: JSON.stringify({ id: item.id, name: item.name })
                            }))
                        }
                    />
                </Form.Item>
                <Button icon={<ShopOutlined />} type='dashed' block onClick={() => message.info('This Should Open the Add New Supplier Form')}>Add A New Supplier?</Button>
                <Divider />
                <Button block type='primary' size="large" icon={<SaveOutlined />} htmlType='submit' loading={loading}>Update</Button>
            </Form>
        </>
    )
}

export default memo(RequestForQuotationForm);