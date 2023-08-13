'use client';

import PaneStyles from '../_styles/pane.module.css';
import { PropsWithChildren } from 'react';
import { theme } from 'antd'
import Tabs from './tabs'
import Status from './status'

const { useToken } = theme
export default function Panel(props: PropsWithChildren<any>) {

    const { token } = useToken()
    return (
        <div className={PaneStyles.wrapper}>
            <div className={PaneStyles.scrollPaneWrapper}>
                <div className={PaneStyles.scrollPane}>
                    <Status />
                </div>
            </div>
            <div className={PaneStyles.scrollPaneWrapper} style={{ background: token.colorBgContainerDisabled }}>
                <div className={PaneStyles.scrollPane}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}