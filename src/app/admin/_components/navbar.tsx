'use client';

import { AuditOutlined, BellOutlined, CalendarOutlined, DesktopOutlined, HomeOutlined, QuestionOutlined, SettingOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip, theme } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Style from './navbar.module.css';

type INavbarItemType = {
    key: string,
    href: string,
    icon?: any,
    label?: string,
    disabled?: boolean,
    type?: 'separator'
}
//Navbar Items
const NavbarItems: { top: INavbarItemType[], bottom: INavbarItemType[] } = {
    top: [
        { key: 'dashboard', href: '/admin', icon: HomeOutlined, label: 'Dashboard', },
        { key: 'records', href: '/admin/records', icon: AuditOutlined, label: 'Records' },
        { key: 'users', href: '/admin/users', icon: UserOutlined, label: 'Users' },
        { key: 'separator1', type: 'separator', href: '' },
        { key: 'suppliers', href: '/admin/suppliers', icon: SolutionOutlined, label: 'Suppliers' },
        { key: 'offices', href: '/admin/offices', icon: DesktopOutlined, label: 'Offices' },
        { key: 'separator2', type: 'separator', href: '' }

    ],
    bottom: [
        { key: 'help', href: '/admin/help', icon: QuestionOutlined, label: 'Help & Feedback' },
        { key: 'settings', href: '/admin/settings', icon: SettingOutlined, label: 'Settings' },
    ]
}
function Navbar() {
    const pathname = usePathname()
    const { token } = theme.useToken()
    return (
        <div className={Style.wrapper} style={{ backgroundColor: token.colorBgContainer }}>
            <Space direction='vertical'>
                {
                    NavbarItems.top.map((item: INavbarItemType) => {
                        if (item?.type === 'separator') {
                            return (<hr key={item?.key} />)
                        } else {
                            const NavIcon = typeof item.icon !== 'undefined' ? item.icon : null;
                            return (
                                <Tooltip title={item.label} placement='right' key={item.key}>
                                    <Link href={item.href}>
                                        <Button type='text' icon={<NavIcon />} className={isActive(pathname, item.href, Style.itemActive)} />
                                    </Link>
                                </Tooltip>
                            )
                        }
                    })
                }
                {/* !TODO */}
                <Tooltip title="Schedules" placement='right'>
                    <Button type='text' icon={<CalendarOutlined />} disabled />
                </Tooltip>
                <Tooltip title="Annoucements" placement='right'>
                    <Button type='text' icon={<BellOutlined />} disabled />
                </Tooltip>
                {/* !TODO */}
            </Space>
            <Space direction='vertical'>
                {
                    NavbarItems.bottom.map((item: INavbarItemType) => {
                        const NavIcon = typeof item.icon !== 'undefined' ? item.icon : null;
                        return (
                            <Tooltip title={item.label} placement='right' key={item.key}>
                                <Link href={item.href}>
                                    <Button type='text' icon={<NavIcon />} className={isActive(pathname, item.href, Style.itemActive)} />
                                </Link>
                            </Tooltip>
                        )
                    })
                }
            </Space>
        </div>
    )
}

//determine nav item is active?
const isActive = (path: string, url: string, className: any): string => {
    return `${path === url ? className : ''}`
}

export default Navbar;