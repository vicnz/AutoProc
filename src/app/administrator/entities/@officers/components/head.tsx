'use client';

import { Button, Card, Divider, Flex } from 'antd'
import fullname from '@lib/client/fullname'
import React, { Fragment } from 'react'
import BoringAvatar from 'boring-avatars';
import { EditOutlined } from '@ant-design/icons';
import Edit from './edit'

function Head(props: { data: Array<any> }) {
    return (
        <div>
            {
                props.data.map((item: any) => (
                    <Fragment key={item.id}>
                        <Edit data={{ ...item }} />
                        <div style={{ height: 5 }} />
                    </Fragment>
                ))
            }
        </div >
    )
}

export default Head