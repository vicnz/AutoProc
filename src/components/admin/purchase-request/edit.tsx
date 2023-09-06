
import { ReloadOutlined, MinusCircleOutlined, PlusOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { Form, Space, Card, Input, Button, DatePicker, AutoComplete, InputNumber, Select, Tooltip, Divider, Switch } from "antd";
import { ActionType, useManager } from "./manager";

//mock data
import { defaultData } from './mock.test'
import { useState } from "react";

const FormEdit = function () {
    const [state, dispatch] = useManager()
    const [form] = Form.useForm()


    const onSave = (e: any) => {
        e.preventDefault()
        dispatch(ActionType.UPDATE, { data: form.getFieldsValue() })
    }

    return (
        <Form layout="vertical" form={form} initialValues={...defaultData as any} onChange={onSave}>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Card>
                    <Space style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
                        {/* PR Number */}
                        <Form.Item label="PR No." colon name={'pr_no'}>
                            <Input
                                prefix={<span>Series No. </span>}
                                suffix={
                                    <Button type='text' block size="small" icon={<ReloadOutlined />}>GENERATE</Button>
                                }
                            />
                        </Form.Item>
                        {/* PR Number */}
                        {/* ISSUED DATE */}
                        <Form.Item label="Date" rules={[{ required: true }]} name={'date_issued'}>
                            <DatePicker />
                        </Form.Item>
                        {/* ISSUED DATE */}
                    </Space>
                    <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                        {/* SAI NUMBER */}
                        <Form.Item label="SAI No." name={'sai_no'}>
                            <Input />
                        </Form.Item>
                        {/* SAI NUMBER */}
                        {/* OBR NUMBER */}
                        <Form.Item label="OBR No." name={'obr_no'}>
                            <Input />
                        </Form.Item>
                        {/* OBR NUMBER */}
                        {/* REF NUMBER */}
                        <Form.Item label="REF No." name={'ref_no'}>
                            <Input />
                        </Form.Item>
                        {/* REF NUMBER */}
                    </Space>
                </Card>
                <Card title="End User Information">
                    <Space style={{ display: 'grid', gridTemplateColumns: '1fr auto auto' }}>
                        {/* ISSUED BY */}
                        <Form.Item label="Issued By" name={'issued_by'}>
                            {/* TODO : SERVER FETCH THIS LIST */}
                            <AutoComplete />
                        </Form.Item>
                        {/* ISSUED BY */}
                        {/* DEPARTMENT */}
                        <Form.Item label="Department" name={'department'}>
                            <Input />
                        </Form.Item>
                        {/* DEPARTMENT */}
                        {/* SECTOR */}
                        <Form.Item label="Section" name={'section'}>
                            <Input />
                        </Form.Item>
                        {/* SECTOR */}
                    </Space>
                    {/* PURPOSE */}
                    <Form.Item label="Purpose" name={'purpose'}>
                        <Input.TextArea placeholder="Purpose" style={{ height: 200 }} />
                    </Form.Item>
                    {/* PURPOSE */}
                </Card>
                <Card title="Request Items">
                    <Form.List name="particulars">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 2, }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'Item Description']}
                                            rules={[{ required: true }]}
                                            style={{ flexGrow: 3 }}
                                        >
                                            <Input placeholder="Item" style={{ width: 'inherit' }} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'Unit Cost']}
                                            rules={[{ required: true, }]}
                                            style={{ flexGrow: 0 }}
                                        >
                                            <Input placeholder="Unit Cost" prefix={"₱"} style={{ width: 'inherit' }} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'Quantity']}
                                            rules={[{ required: true, }]}
                                            style={{ flexGrow: 0 }}
                                        >
                                            <InputNumber placeholder="Quantity" style={{ width: 'inherit' }} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'Unit of Issue']}
                                            rules={[{ required: true, }]}
                                            style={{ flexGrow: 0 }}
                                        >
                                            <Select placeholder="Unit of Cost" defaultValue={'default'} options={[{ label: 'Pieces', value: 'pcs' }, { label: 'Bundle', value: 'bndl' }, { label: 'None', value: 'default' }]} style={{ width: 'inherit' }} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'Stock Number']}
                                            rules={[{ required: false, }]}
                                            style={{ flexGrow: 0 }}
                                        >
                                            <Input placeholder="Stock No." style={{ width: 'inherit' }} />
                                        </Form.Item>
                                        <Tooltip title="Remove Item">
                                            <MinusCircleOutlined onClick={() => remove(name)} style={{ flexGrow: 0 }} />
                                        </Tooltip>
                                    </Space>
                                ))}

                                <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                        Add Item
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Card>
            </Space>
        </Form>
    )
}

export default FormEdit;