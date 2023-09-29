import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Space, Input, DatePicker, Divider, Button, FormInstance, App, InputNumber, AutoComplete, AutoCompleteProps, Avatar, Card, Select } from "antd";
import { forwardRef, useCallback, useRef, useState } from "react";
import dayjs from "dayjs";
//coomponents
import { UNIT_OF_MEASUREMENTS } from "@/lib/contants";
import PRNumber from '../../_components/shared/pr-no';
//configs
const initialValue = {
    date: dayjs(),
    particulars: []
}
const { useApp } = App
//
const AddForm = function (props: { close: () => any, users: any[] }) {
    const formRef = useRef<FormInstance>(null)
    const [saving, setSaving] = useState(false)
    const { message } = useApp()

    //submit data
    const onFinish = async () => {
        setSaving(true)
        let response = await fetch('/administrator/api/records/pr', { method: 'POST', body: JSON.stringify({ ...formRef.current?.getFieldsValue(), date: dayjs(formRef.current?.getFieldValue('date')).toISOString() }), headers: [['Content-Type', 'application/json']] })
        if (response.ok) {
            setSaving(false)
            message.success('Saved Procurement Record', 5)
            props.close()
        } else {
            setSaving(false)
            message.error('Error, Please Try Again')
        }
    }

    return (
        <Form layout="vertical" ref={formRef} onFinish={onFinish} autoComplete="false" initialValues={initialValue} colon>
            {/* purchase reqest number */}
            <Form.Item name="pr_no" label="Purchase Request Number" tooltip="Auto Generated PR Numbers are traced based from the latest PR Record " rules={[{ pattern: /\d\d\d\d-\d\d-\d\d[A-Z,a-z,0-9]{2}/i, message: 'Invalid PR Number Format' }, { len: 12, message: 'PR Number Format : 0000-00-0000' }, { required: true, message: 'Required Field' }]} >
                <PRNumber allowClear instance={formRef} />
            </Form.Item>
            {/* Referenctial Number */}
            <Space style={{ width: '100%' }}>
                <Form.Item name="sai" label="SAI" rules={[{ pattern: /\w\w\w-\d\d\d\d-\d\d\d/i, message: 'Invalid Format' }, { required: true, message: 'Required Field' }]}>
                    <Input allowClear placeholder="AAA-9999-999" />
                </Form.Item>
                <Form.Item name="obr" label="OBR" rules={[{ pattern: /\w\w\w-\d\d\d\d-\d\d\d/i, message: 'Invalid Format' }, { required: true, message: 'Required Field' }]}>
                    <Input allowClear placeholder="AAA-9999-999" />
                </Form.Item>
                <Form.Item name="reference" label="Reference Number" style={{ width: 200 }} rules={[{ required: true, message: 'Required Field' }]}>
                    <Input allowClear addonBefore={`BAC-RESO-`} />
                </Form.Item>
                <Form.Item name="date" label="Issued Date" rules={[{ required: true, message: 'Required Field' }]}>
                    <DatePicker />
                </Form.Item>
            </Space>
            <Space align="start" style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 30%' }}>
                <div>
                    <Form.Item name="enduserId" label="End User" rules={[{ required: true }, { min: 1, len: 36 }]}>
                        {/**@ts-ignore */}
                        <SelectEndUser placeholder="Type the User's name" allowClear data={props.users} />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item name="budget" label="Approved Budget" rules={[{ required: true, message: 'Required Field' }]}>
                        <InputNumber min={0} style={{ width: '100%' }} addonBefore={<>&#8369;</>} />
                    </Form.Item>
                </div>
            </Space>
            <Form.Item name="purpose" label="Purpose" rules={[{ required: true, message: 'Please add a purpose to this purchase request' }]}>
                <Input.TextArea rows={8} allowClear />
            </Form.Item>
            <Divider>Particulars</Divider>
            {/* Particulars */}
            <Form.Item label="Particulars" rules={[{ required: true }]} required>
                <Particulars />
            </Form.Item>
            {/* Particulars */}
            <Divider />
            {/* Submit Button */}
            <Button block icon={<PlusCircleOutlined />} type='primary' htmlType="submit" size='large' loading={saving}>Add PR</Button>
        </Form>
    )
}


const Particulars = forwardRef((props, ref) => {
    return (
        <Form.List
            name="particulars"
            rules={[{
                validator(rule, value) {
                    if (value?.length < 1) {
                        return Promise.reject('Empty Particulars')
                    } else {
                        return Promise.resolve("resolved")
                    }
                },
                message: "Add At Least One Item"
            }]}
        >
            {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map((field) => (
                        <Space key={field.key} style={{ marginBottom: 16 }}>
                            <Form.Item noStyle name={[field.name, 'qty']} rules={[{ required: true }]}>
                                <InputNumber placeholder="Quantity" style={{ width: 75 }} min={1} />
                            </Form.Item>
                            <Form.Item noStyle name={[field.name, 'unit']} rules={[{ required: true }]}>
                                <SelectUnitOfMeasurement />
                            </Form.Item>
                            <Form.Item noStyle name={[field.name, 'description']} rules={[{ required: true }]}>
                                <Input placeholder="Item Description" style={{ width: 175 }} />
                            </Form.Item>
                            <Form.Item noStyle name={[field.name, 'stock_no']} initialValue={''}>
                                <Input placeholder="Stock Number" />
                            </Form.Item>
                            <Form.Item noStyle name={[field.name, 'price']} rules={[{ required: true }]}>
                                <InputNumber placeholder="Unit Price" addonBefore={<>&#8369;</>} style={{ width: 150 }} min={1} />
                            </Form.Item>
                            <MinusCircleOutlined
                                onClick={() => {
                                    remove(field.name);
                                }}
                            />
                        </Space>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add Item
                        </Button>
                    </Form.Item>
                    <Form.ErrorList errors={errors} />
                </>
            )}
        </Form.List>
    )
})

let index = 0;
const SelectUnitOfMeasurement = forwardRef((props, ref) => {
    return (
        <Select
            {...props}
            ref={ref as any}
            style={{ width: 135 }}
            placeholder="Unit of Issue"
            options={UNIT_OF_MEASUREMENTS.map((item) => ({ label: item.name, value: item.value }))}
        />
    )
})


interface user {
    id: string,
    fname: string,
    mname?: string,
    lname: string,
    suffix?: string,
    profile?: any,
    department?: { name: string, description: string },
    section?: { name: string, description: string }
}

const SelectEndUser = forwardRef((props: AutoCompleteProps & { data: user[] }, ref) => {
    const [options, setOptions] = useState<Array<user>>(props.data)
    const [selected, setSelected] = useState<user | null>()

    const handleSearch = useCallback((value: string) => {
        setOptions(!value ? [] : props.data.filter((item: user) => item.fname.toLowerCase().startsWith(value.toLowerCase())))
    }, [options])

    const onSelect = (value: any) => {
        setSelected(options.find((item: user) => (item.id === value)))
    }

    const onClear = () => {
        setSelected(null)
    }

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }} >
            <AutoComplete
                {...props}
                ref={ref as any}
                options={...options.map((item: user) => (
                    { value: item.id, label: `${item.fname} ${item.mname ? item.mname + " " : ''} ${item.lname}${item.suffix ? ' ' + item.suffix : ''}` }
                ))}
                onSearch={handleSearch}
                onSelect={onSelect}
                style={{ width: 'inherit' }}
                allowClear
                onClear={onClear}
                virtual

            />
            {
                selected ?
                    <Card style={{ width: '100%' }}>
                        <Card.Meta
                            avatar={selected.profile ? <Avatar src={selected?.profile} /> : <Avatar icon={<UserOutlined />} />}
                            title={`${selected.fname} ${selected.mname ? selected.mname + " " : ''} ${selected.lname}${selected.suffix ? ' ' + selected.suffix : ''}`}
                            description={<span>{selected.department?.description} | <i>{selected?.section?.description}</i></span>}
                        />
                    </Card>
                    : null
            }
        </div>
    )
})

export default AddForm;
