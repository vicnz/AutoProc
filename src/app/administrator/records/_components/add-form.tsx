import { CloseCircleOutlined, MinusCircleOutlined, PlusCircleOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Space, Input, DatePicker, Divider, Button, FormInstance, AutoComplete, Card, InputNumber, InputRef, Select, Avatar, Popconfirm, App, AutoCompleteProps } from "antd";
import { forwardRef, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
//coomponents
import PRNumber from '../../_components/shared/pr-no';
import { UNIT_OF_MEASUREMENTS } from '@lib/contants'
//configs
const initialValue = {
    issue_date: dayjs(),
}
const { useApp } = App
//
const AddForm = function (props: { close: () => any }) {
    const formRef = useRef<FormInstance>(null)
    const { message } = useApp()

    //submit data
    const onFinish = async () => {
        let response = await fetch('/administrator/api/records/pr', { method: 'POST', body: JSON.stringify(formRef.current?.getFieldsValue()), headers: [['Content-Type', 'application/json']] })
        if (response.ok) {
            message.success('Saved Procurement Record', 5)
        } else {
            message.error('Error, Please Try Again')
        }
    }

    return (
        <Form layout="vertical" ref={formRef} onFinish={onFinish} autoComplete="false" initialValues={initialValue} requiredMark={false}>
            {/* purchase reqest number */}
            <Form.Item name="pr_no" label="PR NO" tooltip="autogenerate pr number based from last generated id" rules={[{ pattern: /\d\d\d\d-\d\d-\d\d[A-Z,a-z,0-9]{2}/i, message: 'Invalid PR Number Format' }, { len: 12, message: 'PR Number Format : 0000-00-0000' }]}>
                <PRNumber allowClear />
            </Form.Item>
            {/* Referenctial Number */}
            <Space style={{ width: '100%' }}>
                <Form.Item name="sai" label="SAI" rules={[{ pattern: /\w\w\w-\d\d\d\d-\d\d\d/i, message: 'Invalid Format' }]}>
                    <Input allowClear />
                </Form.Item>
                <Form.Item name="obr" label="OBR" rules={[{ pattern: /\w\w\w-\d\d\d\d-\d\d\d/i, message: 'Invalid Format' }]}>
                    <Input allowClear />
                </Form.Item>
                <Form.Item name="ref_no" label="Reference Number" style={{ width: 200 }}>
                    <Input allowClear addonBefore={`BAC-RESO-`} />
                </Form.Item>
                <Form.Item name="issue_date" label="Issued Date" rules={[{ required: true }]}>
                    <DatePicker />
                </Form.Item>
            </Space>
            <Form.Item name="enduserId" label="End User" rules={[{ required: true }]}>
                {/**@ts-ignore */}
                <SelectEndUser placeholder="Type the User's name" allowClear />
            </Form.Item>
            <Form.Item name="purpose" label="Purpose">
                <Input.TextArea rows={5} allowClear />
            </Form.Item>
            <Divider>Particulars</Divider>
            {/* Particulars */}
            <Form.Item label="Particulars" rules={[{ required: true, message: 'Must Have At Least One Item', }]}>
                <Particulars />
            </Form.Item>
            {/* Particulars */}
            <Divider />
            {/* Submit Button */}
            <Space style={{ width: '100%' }}>
                <Button block icon={<PlusCircleOutlined />} type='primary' htmlType="submit">Add PR</Button>
                <Popconfirm
                    title="Cancel Changes"
                    description="Cancel Purchase Request Item?"
                    onConfirm={() => props.close()}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button block icon={<CloseCircleOutlined />} type='text'>Cancel</Button>
                </Popconfirm>
            </Space>
        </Form>
    )
}

export default AddForm;

//components
const SelectEndUser = forwardRef((props: AutoCompleteProps, ref) => {
    const [options, setOptions] = useState<Array<{ label: string, value: any }>>([])
    const [items, setItems] = useState<Array<{ label: string, value: any }>>([])
    const [selected, setSelected] = useState<{ label: string, value: any } | null>()

    useEffect(() => {
        async function getUsers() {
            const response = await fetch('/administrator/api/user?reqtype=selection')
            const json = await response.json()
            let filtered = (json as Array<{ id: string, name: string, departmentId: string }>).map(item => ({ label: item.name, value: item.id }))
            setOptions([...filtered])
        }
        getUsers()
    }, [])

    const handleSearch = (value: string) => {
        setItems(!value ? [] : options.filter(item => item.label.toLowerCase().startsWith(value.toLocaleLowerCase())))
    }


    const onSelect = (value: any) => {
        setSelected(options.find(item => item.value === value))
    }

    const onClear = () => {
        setSelected(null)
    }

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }} >
            <AutoComplete ref={ref as any} {...props} options={items} onSearch={handleSearch} onSelect={onSelect} style={{ width: 'inherit' }} allowClear onClear={onClear} />
            {
                selected ?
                    <Card style={{ width: '100%' }}>
                        <Card.Meta avatar={<Avatar icon={<UserOutlined />} />} title={selected.label.toUpperCase()} description={<span>Bids & Awards Committee : <i>Procurement Section</i></span>} />
                    </Card>
                    : null
            }
        </div>
    )

})

const Particulars = forwardRef((props, ref) => {
    return (
        <Form.List
            name="particulars"
            rules={[
                {
                    validator: async (_, particulars) => {
                        if (particulars.length === 0) {
                            return Promise.reject(new Error("Empty Particulars"))
                        }
                    },
                    message: 'Particulars Must Not Be Empty'
                }
            ]}
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
                            <Form.Item noStyle name={[field.name, 'stock_no']} rules={[{ required: true }]}>
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
                </>
            )}
        </Form.List>
    )
})

//select unit of measurement

let index = 0;
const SelectUnitOfMeasurement = forwardRef((props, ref) => {
    return (
        <Select
            {...props}
            ref={ref as any}
            style={{ width: 135 }}
            placeholder="Unit of Issue"
            defaultValue={'pc'}
            options={UNIT_OF_MEASUREMENTS.map((item) => ({ label: item.name, value: item.value }))}

        />
    )
})