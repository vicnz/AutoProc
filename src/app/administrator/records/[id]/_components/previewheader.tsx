'use client';
//lib
import Image from 'next/image'
import { Space } from 'antd'
import { PropsWithChildren, memo } from 'react';
//components
import bsclogo from '@media/templates/bsclogo.png'
import ambisyon from '@media/templates/ambisyon.png'
//config
const PreviewHeader = function (props: PropsWithChildren<{ height?: number }>) {
    return (
        <div style={{ height: props.height || 150, display: 'grid', placeItems: 'center', padding: '25px' }}>
            <div style={{ width: '100%' }}>
                <Space style={{ display: 'grid', gridTemplateColumns: '25% 1fr 25%', width: '100%' }} size='large'>
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <Image src={bsclogo} height={75} width={75} alt="BSC-Logo" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '1.8em', fontFamily: 'serif' }}>Batanes State College</span>
                        <span style={{ color: 'dimgray', fontSize: '1em', fontFamily: 'serif' }}>Washinton Ave. San Antonio, Basco</span>
                    </div>
                    <div style={{ width: '100%', textAlign: 'left' }}>
                        <Image src={ambisyon} height={75} width={150} alt="Ambisyon" />
                    </div>
                </Space>
                {
                    props.children
                }
            </div>
        </div>
    )
}

export default memo(PreviewHeader)