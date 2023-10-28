'use client';

import { Avatar, Form, Space } from 'antd'
type UserManagementFormProps = {
    id: string,
    isEdit: boolean,
    data: any, //TODO Finalized the Schema Structure
}
const UserManagementForm = (props: UserManagementFormProps) => {
    const [form] = Form.useForm()
    return (
        <>
            <Form form={form}>
                <Space align='center'>
                    <Avatar />
                </Space>
            </Form>
        </>
    )
}

export default UserManagementForm;