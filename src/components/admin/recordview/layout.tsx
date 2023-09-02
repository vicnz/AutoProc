'use client';

import { ClockCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import Styles from '../styles/recordview.module.css'
import TabSwitch from './tabs'
import { theme, Spin, Button } from 'antd'
import dynamic from 'next/dynamic';
const DocumentStatus = dynamic(async () => await import('./status'), { ssr: false, loading: () => <div style={{ height: '50vh', width: '250px', display: 'grid', placeItems: 'center' }}><Spin /></div> })


const { useToken } = theme
const RecordViewLayout = function () {
    const { token } = useToken()
    return (
        <div className={Styles.wrapper}>
            <div className={Styles.tabs}>
                <TabSwitch />
            </div>
            <div className={Styles.status_pane} style={{ background: token.colorBgContainer }}>
                <div className={Styles.status_pane_header}>
                    <span>DOCUMENT STATUS</span>
                    <Button title="" icon={<ReloadOutlined />} type='text' />
                </div>
                <div className={Styles.status_panel}>
                    <div className={Styles.status_panel_scroll}>
                        <DocumentStatus />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default RecordViewLayout;