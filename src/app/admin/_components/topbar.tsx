'use client';

import { Space, theme } from 'antd';
import Image from 'next/image'
//components
import Styles from './topbar.module.css';
import Search from './search'
import Notification from './notification'

//Images
import LogoSmall from '@images/small.png'
import LogoMedium from '@images/medium.png'

const { useToken } = theme

//Brand
const BrandName = () => {
    return (
        <Space>
            <Image src={LogoSmall} alt={'AutoProc Logo'} height={25} width={25} style={{ objectFit: 'contain' }} />
            <div />
            <Image src={LogoMedium} alt={'AutoProc Logo Word Styled'} height={15} width={100} style={{ objectFit: 'contain' }} />
        </Space>
    )
}

export default function Topbar() {
    const { token } = useToken()
    return (
        <nav className={Styles.navbar} style={{ backgroundColor: token.colorBgContainer }}>
            <BrandName />
            <Search />
            <Notification />
        </nav>
    )
}
