'use client';

//libs
import { AuditOutlined, BarChartOutlined, StockOutlined } from '@ant-design/icons';
import { Skeleton, TabsProps, Tag } from 'antd';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
//components
const Overview = dynamic(async () => await import('./overview'), { loading: () => <Skeleton paragraph={{ rows: 25 }} /> })
//config

//TabPane Wrapper
const TabPaneWrapper = function (props: PropsWithChildren<any>) {
    return (
        <div style={{ height: 'calc(100vh - 112px)', width: '100%', position: 'relative', overflowY: 'auto' }}>
            <div style={{ height: 'auto', width: 'inherit', position: 'absolute', top: 0, left: 0, paddingRight: '20px' }}>
                {props.children}
            </div>
        </div>
    )
}

const TabPanes: TabsProps['items'] = [
    {
        key: 'dashboard',
        label: <span><BarChartOutlined />&nbsp;Overview</span>,
        destroyInactiveTabPane: true,
        tabKey: 'dashboard',
        children: (
            <TabPaneWrapper>
                <Overview />
            </TabPaneWrapper>
        ),
    },
    {
        key: 'supplier',
        label: <span><AuditOutlined />&nbsp;Suppliers&nbsp;<Tag color='orange'>beta</Tag></span>,
        destroyInactiveTabPane: true,
        tabKey: 'suppliers',
        children: (
            <TabPaneWrapper>
                Supplier
            </TabPaneWrapper>
        )
    },
]

export default TabPanes;