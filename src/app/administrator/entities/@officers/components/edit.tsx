import fullname from '@lib/client/fullname'
import { App, Button, Card, Divider, Flex, Form, Input, Modal } from 'antd'
import { useState } from 'react'
import BoringAvatar from 'boring-avatars'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'
import { objectToForm } from '@lib/converters/formData'
import { updateOfficer, removeOfficer } from './action'

function EditOfficer(props: { data: any, isMember?: boolean }) {
    const item = props.data
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const { message } = App.useApp()

    const onUpdate = async () => {
        const data = objectToForm(form.getFieldsValue())
        const response = await updateOfficer(data);

        if (response.error) {
            message.error("Server Error Occured")
        }
    }

    const onDelete = async () => {
        const response = await removeOfficer(item.id)
        if (response.error) {
            message.error('Server Error Occured')
        }
    }

    return (
        <>
            <Card>
                <Flex justify='space-between'>
                    <Card.Meta avatar={<BoringAvatar name={item.fname} variant='beam' />} title={fullname({ fname: item.fname, mname: item.mname, lname: item.lname, suffix: item.suffix }, true)} description={item.title} />
                    <Button icon={<EditOutlined />} type='dashed' shape="circle" onClick={() => setOpen(true)} />
                </Flex>

                <Modal footer={null} open={open} onCancel={() => setOpen(false)} destroyOnClose width={300} closeIcon={null} title="Update Officer Info">
                    <Form initialValues={item} form={form} onFinish={onUpdate}>
                        <Flex vertical gap={10}>
                            <Form.Item hidden name="id">
                                <Input />
                            </Form.Item>
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
                        </Flex>
                        {
                            props.isMember === true && (
                                <>
                                    <Divider />
                                    <Button block danger onClick={onDelete}>Remove Member</Button>
                                </>
                            )
                        }
                        <Divider />
                        <Flex gap={10} justify='right'>
                            <Button icon={<SaveOutlined />} type='primary' htmlType='submit'>Apply</Button>
                            <Button icon={<SaveOutlined />} onClick={() => setOpen(false)}>Cancel</Button>
                        </Flex>
                    </Form>
                </Modal>
            </Card>
        </>
    )
}

export default EditOfficer