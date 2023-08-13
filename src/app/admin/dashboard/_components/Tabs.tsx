'use client';

import { Tabs } from 'antd'
import { LineChartOutlined, PoundCircleFilled, ShopOutlined, UserOutlined, CompassOutlined } from '@ant-design/icons'
import { FC, ReactNode } from 'react';


import Overview from './Overview'
import Procurements from './Procurements';
import TestTable from '../../_components/table.test'
import Activity from './Activity';
const Sections = [
    {
        key: 'overview',
        label: <span><LineChartOutlined /> Overview</span>,
        children: (
            <TabItem>
                <Overview />
            </TabItem>
        )
    },
    {
        key: 'procurements',
        label: <span><ShopOutlined /> Suppliers</span>,
        children: (
            <TabItem>
                <Procurements />
            </TabItem>
        )
    },
    {
        key: 'users',
        label: <span><CompassOutlined /> Activity</span>,
        children: (
            <TabItem>
                <Activity />
            </TabItem>
        )
    }
]

const TabController: FC = (props) => {
    return (
        <>
            <Tabs tabPosition='left' items={Sections} style={{ height: 'calc(100vh - 112px)' }} />
        </>
    )
}


function TabItem({ children, ...props }: { children: ReactNode }) {
    return (
        <div style={{ height: 'calc(100vh - 112px)', width: '100%', position: 'relative', overflowY: 'auto' }}>
            <div style={{ height: 'auto', width: 'inherit', position: 'absolute', top: 0, left: 0 }}>
                {children}
            </div>
        </div>
    )
}

export default TabController;