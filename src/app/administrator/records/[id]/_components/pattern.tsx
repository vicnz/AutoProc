'use client';

import { theme } from "antd";
import { PropsWithChildren, memo } from "react";
const { useToken } = theme
//
const Pattern = function (props: PropsWithChildren<{ width?: number }>) {
    const { token } = useToken()
    const sharedColor = '#B1B5B3'
    return (
        <div style={{ position: 'relative', height: '100%', width: '100%', overflowY: 'auto', backgroundImage: `radial-gradient(circle, transparent 25%, ${token.colorBgLayout}  26%),linear-gradient(45deg, transparent 46%, ${sharedColor}90 47%, ${sharedColor}90 52%, transparent 53%), linear-gradient(135deg, transparent 46%, ${sharedColor}90 47%, ${sharedColor}90 52%, transparent 53%)`, backgroundSize: '2em 2em' }}>
            <div style={{ position: 'absolute', height: 'auto', top: 0, left: 0, padding: '25px 0', display: 'grid', placeItems: 'center', width: 'inherit' }}>
                <div style={{ display: 'grid', placeItems: 'center', width: props.width || 775, }}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default memo(Pattern);