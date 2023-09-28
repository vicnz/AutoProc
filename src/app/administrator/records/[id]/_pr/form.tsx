import { PlusCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { Form, Space, Input, DatePicker, Divider, Button, FormInstance, App, InputNumber } from "antd";
import { useRef, useState } from "react";
import dayjs from "dayjs";
//coomponents
import PRNumber from '../../../_components/shared/pr-no';
import SelectEndUser from '../../_components/select-user';
import SelectParticulars from '../../_components/select-particulars';
//configs
const { useApp } = App
//
const AddForm = function (props: { close: () => any, users: any[], data: any }) {
    const formRef = useRef<FormInstance>(null)
    const [saving, setSaving] = useState(false)
    const { message } = useApp()

    //submit data
    const onFinish = async () => {
        setSaving(true)
        let response = await fetch(`/administrator/api/records/pr?_id=${props.data?.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                ...formRef.current?.getFieldsValue(),
                date: dayjs(formRef.current?.getFieldValue('date')).toISOString()
            }),
            headers: [['Content-Type', 'application/json']]
        })
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
        <Form layout="vertical" ref={formRef} onFinish={onFinish} autoComplete="false" initialValues={{ ...props.data, date: dayjs(props.data?.date) }} colon disabled={props.data.final}>
            {/* purchase reqest number */}
            <Form.Item name="pr_no" label="Purchase Request Number" tooltip="Auto Generated PR Numbers are traced based from the latest PR Record " rules={[{ pattern: /\d\d\d\d-\d\d-\d\d[A-Z,a-z,0-9]{2}/i, message: 'Invalid PR Number Format' }, { len: 12, message: 'PR Number Format : 0000-00-0000' }, { required: true, message: 'Required PR Number' }]} >
                <PRNumber allowClear instance={formRef} />{/*TODO  Disable Form*/}
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
                <Form.Item name="date" label="Issued Date" rules={[{ required: true }]}>
                    <DatePicker disabled />
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
            <Form.Item name="purpose" label="Purpose">
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
            <Button block icon={<SaveOutlined />} type='primary' htmlType="submit" size='large' loading={saving}>Update Record</Button>
        </Form>
    )
}

export default AddForm;
