import { PlusCircleOutlined } from "@ant-design/icons";
import { Form, Space, Input, DatePicker, Divider, Button, FormInstance, App, InputNumber } from "antd";
import { useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
//coomponents
import SelectParticulars from "./select-particulars";
import SelectUser from "./select-user";
import PRNumber from '@components/admin/features/purchase-number';

//configs
const initialValue = {
    date: dayjs(),
    particulars: []
}
const { useApp } = App
//
const AddForm = function (props: { close: () => any, users: any[], data?: any }) {
    const preload = useMemo(() => {
        if (typeof props.data !== undefined) {
            return { ...props.data, date: dayjs(props.data.date) }
        } else {
            return { date: dayjs(), particulars: [] }
        }
    }, [props.data])

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
        <Form layout="vertical" ref={formRef} onFinish={onFinish} autoComplete="false" initialValues={preload} colon>
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
                        <SelectUser placeholder="Type the User's name" allowClear data={props.users} />
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
                <SelectParticulars />
            </Form.Item>
            {/* Particulars */}
            <Divider />
            {/* Submit Button */}
            <Button block icon={<PlusCircleOutlined />} type='primary' htmlType="submit" size='large' loading={saving}>Add PR</Button>
        </Form>
    )
}

export default AddForm;
