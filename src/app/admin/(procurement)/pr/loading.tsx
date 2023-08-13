'use client';

import { Skeleton } from 'antd'

export default function Loading() {
    return (
        <div style={{ padding: '10px' }}>
            <Skeleton active />
            <Skeleton active />
        </div>
    )
}