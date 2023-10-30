'use client';

import { Avatar, Button, Form, Space } from 'antd'
import BoringAvatar from 'boring-avatars'
import FlexContainer from '@components/shared/Flex'
import { EditOutlined, ProfileOutlined, UserAddOutlined } from '@ant-design/icons';
import { openEditor, } from 'react-profile'
type UserManagementFormProps = {
    id?: string,
    isEdit: boolean,
    data?: any, //TODO Finalized the Schema Structure
}
const UserManagementForm = (props: UserManagementFormProps) => {
    const [form] = Form.useForm()

    const openFile = async (e: any) => {
        console.log('Typeof', typeof e)
        const result = await openEditor(e)
    }
    return (
        <>
            <Form form={form}>
                <FlexContainer alignItems='center' justifyContent='center' flexDirection='column' gap={10} styles={{ width: '100%' }}>

                </FlexContainer>
            </Form>
        </>
    )
}

export default UserManagementForm;