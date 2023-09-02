'use client';

import { QuestionCircleOutlined, ReloadOutlined, UserAddOutlined } from '@ant-design/icons';
import Header from '@components/shared/header'
import { Button, Divider } from 'antd'

const UserViewHeader = function (props: { title: string }) {
    return (
        <Header title={props.title} >
            <Button icon={<UserAddOutlined />} type="text">Add User</Button>
            <Divider type='vertical' />
            <Button icon={<ReloadOutlined />} type="text">Reload</Button>
            <Divider type='vertical' />
            <Button icon={<QuestionCircleOutlined />} type="text" />
        </Header>
    )
}

export default UserViewHeader;