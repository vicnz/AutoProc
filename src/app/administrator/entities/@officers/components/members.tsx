'use client';

import { Button, Card, Divider, Flex } from 'antd'
import React, { Fragment } from 'react'
import BoringAvatar from 'boring-avatars';
import { EditOutlined } from '@ant-design/icons';
import fullname from '@lib/client/fullname';
import Edit from './edit'
import AddMember from './add'

function Head(props: { data: Array<any> }) {
    return (
        <div>
            {
                props.data.map((item: any) => (
                    <Fragment key={item.id}>
                        <Edit data={{ ...item }} isMember />
                        <div style={{ height: 5 }} />
                    </Fragment>
                ))
            }
            <Divider />
            <Flex align='center' justify='center'>
                <AddMember />
            </Flex>
        </div >
    )
}

export default Head