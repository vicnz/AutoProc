import { UNIT_OF_MEASUREMENTS } from "@/lib/contants";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Space, InputNumber, Input, Button, Select } from "antd";
import { forwardRef } from "react";

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
export default Particulars;