'use client';

import { Space, theme } from 'antd';
//components
import TopBarStyles from '../_styles/topbar.module.css';
import { letter, single } from '@/app/admin/_components/logo';
import Notifications from '@/app/admin/_components/notification';
import SearchBar from '@/app/admin/_components/search';

const { useToken } = theme
export default function Topbar() {
    const { token } = useToken()
    return (
        <nav className={TopBarStyles.navbar} style={{ backgroundColor: token.colorBgContainer }}>
            <BrandName />
            <SearchBar />
            <Notifications />
        </nav>
    )
}

const BrandName = () => {
    return (
        <Space>
            <img src={single} alt={''} height={25} />
            <div></div>
            <img src={letter} alt={''} height={15} />
        </Space>
    )
}