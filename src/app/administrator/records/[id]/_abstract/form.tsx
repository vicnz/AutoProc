'use client';

//lib
import { FolderOpenOutlined, FolderOutlined, SaveOutlined } from '@ant-design/icons';
import { Alert, App, Button, Collapse, DatePicker, Divider, Form, Input, InputNumber, Select, Space } from 'antd';
import { Fragment, memo, useCallback, useMemo, useState } from 'react';
//components
import type { PrismaModels } from '@lib/db';
import dayjs from 'dayjs';
//comfigs
const { useApp } = App
const { useForm } = Form
type IAbstractQuotation = Pick<PrismaModels['abstract'], 'biddingPlace' | 'final' | 'quotations' | 'prId' | 'id' | 'lowestBidder' | 'lowestAmount' | 'date'> & { pr: { particulars: Array<{ qty: number, description: string }> }, price_quotation: { suppliers: Array<{ id: string, name: string }> } }
//
const FormEdit = function (props: { data: IAbstractQuotation, close?: any }) {
    const { message } = useApp()
    const [isLoading, setLoading] = useState(false)
    const initialValue = useMemo(() => {
        return { ...props.data, date: dayjs(props.data.date) }
    }, [props.data])

    const [form] = useForm();

    const onFinish = useCallback(async () => {

        //TODO needs proper validation
        setLoading(true) //start loading <Button>
        const lowestBidder = form.getFieldValue('lowestBidder')
        let lowestAmount = 0;
        //compute for bidding amount
        if (!(lowestBidder === null || typeof lowestBidder === 'undefined' || lowestBidder.length === 0)) {
            const bidder = (JSON.parse(lowestBidder) as { id: string, name: string }).id
            let particulars = (props.data.quotations as Array<{ id: string, supplier: string, items: any[] }>).filter(item => {
                return item.id === bidder
            })

            particulars[0].items.forEach((item: { qty: number, price: number }) => {
                lowestAmount += item.price * item.qty
            })
        }

        const dataset = { ...form.getFieldsValue(), id: props.data.id, lowestAmount, date: dayjs(form.getFieldValue('date')).toISOString() }
        const sendUpdate = await fetch(`/administrator/api/records/abstract?_id=${props.data.id}`, {
            method: 'PUT',
            body: JSON.stringify(dataset),
            headers: [['Content-Type', 'application/json']]
        })

        if (sendUpdate.ok) {
            setLoading(false)
            message.info('Saved')
            props.close()
        } else {
            setLoading(false)
            message.info('Failed')
            props.close()
        }

    }, [form.getFieldsValue()])

    return (
        <>
            <Form form={form} layout='vertical' initialValues={initialValue} onFinish={onFinish} disabled={props.data.final}>
                <Space>
                    <Form.Item label="Bidding Place" name="biddingPlace" rules={[{ required: true, message: 'Date is Required' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Date is Required' }]}>
                        <DatePicker />
                    </Form.Item>
                </Space>
                <Alert message='Unit Price Only' banner type='warning' description="Enter only the unit price, the system will calculate the total amount based from the current quantity items" />
                <br />
                <Form.List name="quotations">
                    {(fields) => (
                        <>
                            <Collapse accordion expandIcon={({ isActive }) => isActive ? <FolderOpenOutlined /> : <FolderOutlined />} expandIconPosition='end' size='small'>
                                {fields.map(({ key: RowKey, name, ...restField }) => {

                                    return (
                                        <Fragment key={RowKey}>
                                            <Collapse.Panel header={<span style={{ whiteSpace: 'normal' }}>{(initialValue.quotations as any[])[RowKey].supplier}</span>} key={RowKey + 'string'}>
                                                <Form.Item hidden name="supplier">
                                                    <Input hidden />
                                                </Form.Item>
                                                <Form.Item hidden name="id">
                                                    <Input hidden />
                                                </Form.Item>
                                                <Form.List name={[name, 'items']} {...restField}>
                                                    {
                                                        (fields) => (
                                                            <>
                                                                {
                                                                    fields.map(({ key, name, ...restField }) => {
                                                                        return (
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, 'price']}
                                                                                key={key}
                                                                                label={(<span style={{ whiteSpace: 'normal' }}>{(initialValue.quotations as any[])[RowKey].items[key].description}</span>)}
                                                                                style={{ width: '100%', marginBottom: 10 }}
                                                                            >
                                                                                <InputNumber min={0} style={{ width: '100%' }} addonBefore={<span style={{ whiteSpace: 'normal' }} title="Quantity">{(initialValue.quotations as any[])[RowKey].items[key].qty}</span>} />
                                                                            </Form.Item>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </Form.List>
                                            </Collapse.Panel>
                                        </Fragment>
                                    )
                                })}
                            </Collapse>
                        </>
                    )}
                </Form.List>
                <Divider />
                <br />
                <Form.Item label="Lowest Bidder" name="lowestBidder">
                    <Select>
                        <Select.Option value={''}>None</Select.Option>
                        {
                            (props.data.price_quotation.suppliers).map(item => {
                                return (<Select.Option value={JSON.stringify(item)} key={item.id}>{item.name}</Select.Option>)
                            })
                        }
                    </Select>
                </Form.Item>
                <Divider />
                <Button icon={<SaveOutlined />} type='primary' size='large' block htmlType='submit' loading={isLoading}>Update</Button>
            </Form>
        </>
    )
}

export default memo(FormEdit);