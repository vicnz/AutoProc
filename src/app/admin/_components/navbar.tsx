'use client';

import { usePathname } from 'next/navigation';
import { Button, Space, Tooltip, theme } from 'antd';
import NavbarStyle from '../_styles/navbar.module.css';
import { ShoppingCartOutlined, StockOutlined, QuestionOutlined, SettingOutlined, MessageOutlined, NotificationOutlined, TeamOutlined, PaperClipOutlined, PieChartOutlined, HomeOutlined, UserOutlined, SecurityScanOutlined, SolutionOutlined, AuditOutlined } from '@ant-design/icons';
import Link from 'next/link';
const { useToken } = theme
function Navbar() {
    const pathname = usePathname()
    const { token } = useToken()
    return (
        <div className={NavbarStyle.wrapper} style={{ backgroundColor: token.colorBgContainer }}>
            <Space direction='vertical'>
                <Link href={'/admin'}>
                    <Button type="text" icon={<HomeOutlined />} className={`${isActive(pathname, '/admin') ? NavbarStyle.itemActive : ''}`} />
                </Link>
                <hr />
                {/* Dashboard Button */}
                <Tooltip title="Dashboard" placement='right'>
                    <Link href={'/admin/dashboard'} prefetch={true}>
                        <Button type={'text'} icon={<StockOutlined />} className={`${isActive(pathname, '/admin/dashboard') ? NavbarStyle.itemActive : ''}`} />
                    </Link>
                </Tooltip>
                {/* Dashboard Button */}
                <Tooltip title="Purchase Requests" placement='right'>
                    <Link href={'/admin/pr'} prefetch={true}>
                        <Button type={'text'} icon={<ShoppingCartOutlined />} className={`${isActive(pathname, '/admin/pr') ? NavbarStyle.itemActive : ''}`} />
                    </Link>
                </Tooltip>
                {/* Dashboard Button */}
                <Tooltip title="Purchase Order" placement='right'>
                    <Link href={'/admin/po'} prefetch={true}>
                        <Button type={'text'} icon={<AuditOutlined />} className={`${isActive(pathname, '/admin/po') ? NavbarStyle.itemActive : ''}`} />
                    </Link>
                </Tooltip>
                <hr />
                {/* Users Button */}
                <Tooltip title="Users" placement='right'>
                    <Link href={'/admin/users'} prefetch={true}>
                        <Button type={'text'} icon={<TeamOutlined />} className={`${isActive(pathname, '/admin/users') ? NavbarStyle.itemActive : ''}`} />
                    </Link>
                </Tooltip>
                {/* Dashboard Button */}
                <Tooltip title="Suppliers" placement='right'>
                    <Link href={'/admin/users'} prefetch={true}>
                        <Button type={'text'} icon={<SolutionOutlined />} className={`${isActive(pathname, '/admin/suppliers') ? NavbarStyle.itemActive : ''}`} />
                    </Link>
                </Tooltip>

            </Space>
            <Space direction="vertical">
                {/* Help & Feedback */}
                <Tooltip title="Help & Feedback" placement='right'>
                    <Link href={'/admin/help'} prefetch={true}>
                        <Button type="text" icon={<QuestionOutlined />} className={`${isActive(pathname, '/admin/help') ? NavbarStyle.itemActive : ''}`} />
                    </Link>
                </Tooltip>
                {/* Settings */}
                <Tooltip title="Settings" placement='right'>
                    <Link href={'/admin/settings'} prefetch={true}>
                        <Button type="text" icon={<SettingOutlined />} className={`${isActive(pathname, '/admin/settings') ? NavbarStyle.itemActive : ''}`} />
                    </Link>
                </Tooltip>
            </Space>
        </div>
    )
}

//is Active
const isActive = (path: string, url: string): boolean => {
    const activeIndicator = {
        // color: 
    }
    return path === url
}

export default Navbar;