'use client';

//libs
import Image from 'next/image'
import { Badge, Button, Divider, Space, Tooltip, theme } from 'antd'
import { NotificationOutlined, QuestionOutlined } from '@ant-design/icons';
//components
import LogoSmall from '@media/small.png'
import LogoMedium from '@media/medium.png'
import SearchBar from './search-bar'
import { memo } from 'react';
//
const { useToken } = theme
const topBarStyle = {
    height: '56px',
    padding: '10px 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}
//
const Topbar = function () {
    const { token } = useToken()
    return (
        <nav style={{ ...topBarStyle, backgroundColor: token.colorBgContainer }}>
            <Space>
                <Image src={LogoSmall} alt="Auto Proc Logo Small" height={25} width={25} style={{ objectFit: 'contain' }} />
                <div />
                <Image src={LogoMedium} alt="Auto Proc Logo Medium" height={15} width={100} style={{ objectFit: 'contain' }} />
            </Space>
            <SearchBar />
            <div>
                <Badge dot>
                    <Button type="text" icon={<NotificationOutlined />} />
                    {/* //TODO Notification Section*/}
                </Badge>
                <Divider type='vertical' />
                <Tooltip placement='bottomLeft' title="Tour With Me">
                    <Button icon={<QuestionOutlined />} type="text" />
                    {/* //TODO App Tour */}
                </Tooltip>
            </div>
        </nav>
    )
}

export default memo(Topbar);