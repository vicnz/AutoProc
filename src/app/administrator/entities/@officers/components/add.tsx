import { App, Button, Card, Divider, Flex, Form, Input, Modal } from 'antd'
import { useState } from 'react'
import { SaveOutlined } from '@ant-design/icons'
import { objectToForm } from '@lib/converters/formData'
import { addOfficer } from './action'

function AddMember(props: { isMember?: boolean }) {
    const item = {
        fname: null,
        mname: null,
        lname: null,
        suffix: null,
        title: 'BAC Member',
        position: 'MEMBER'
    }
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const { message } = App.useApp()

    const onAdd = async () => {
        const data = objectToForm(form.getFieldsValue())
        const response = await addOfficer(data);

        if (response.error) {
            message.error("Server Error Occured")
        }
    }

    return (
        <>
            <Button block type='dashed' onClick={() => setOpen(true)}>Add Member</Button>

            <Modal footer={null} open={open} onCancel={() => setOpen(false)} destroyOnClose width={300} closeIcon={null} title="Add BAC Member">
                <Form initialValues={item} form={form} onFinish={onAdd}>
                    <Flex vertical gap={10}>
                        <Form.Item name="fname" noStyle>
                            <Input placeholder='First Name' />
                        </Form.Item>
                        <Form.Item name="mname" noStyle>
                            <Input placeholder='Middle Name' />
                        </Form.Item>
                        <Form.Item name="lname" noStyle>
                            <Input placeholder='Last Name' />
                        </Form.Item>
                        <Form.Item name="suffix" noStyle>
                            <Input placeholder='Suffix' />
                        </Form.Item>
                        <Form.Item hidden name="title">
                            <Input />
                        </Form.Item>
                    </Flex>
                    <Divider />
                    <Flex gap={10} justify='right'>
                        <Button icon={<SaveOutlined />} type='primary' htmlType='submit'>Apply</Button>
                        <Button icon={<SaveOutlined />} onClick={() => setOpen(false)}>Cancel</Button>
                    </Flex>
                </Form>
            </Modal>
        </>
    )
}

export default AddMember