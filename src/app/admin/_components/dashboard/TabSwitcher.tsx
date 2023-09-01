'use client';
import { BoxPlotOutlined, CompassOutlined, FundProjectionScreenOutlined, LineChartOutlined, SolutionOutlined } from '@ant-design/icons';
import { Badge, Skeleton, Tabs, Tag, Tooltip } from 'antd'
import TabView from './TabView'
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import Rating from './Rating';

const Overview = dynamic(async () => await import('./Overview'), { loading: () => <Skeleton paragraph /> })

const Section = [
    {
        key: 'overview',
        label: <span><CompassOutlined /> Overview</span>,
        children: (
            <TabView>
                <Overview />
            </TabView>
        )
    },
    {
        key: 'suppliers',
        label: <span><SolutionOutlined /> Rating&nbsp;<Tag color='gold'>beta</Tag></span>,
        children: (
            <TabView>
                <Rating />
            </TabView>
        ),
    },
    {
        key: 'activity',
        label: <span><LineChartOutlined /> Activity&nbsp;<Tag color='error'>alpha</Tag></span>,
        children: (
            <TabView>
                <h2>Activity</h2>
            </TabView>
        ),
        disabled: true
    },
]

const TabSwitcher = () => {
    useEffect(() => {
        ChartJS.register(...registerables); //register charts
    }, []);
    return (
        <>
            <Tabs tabPosition='left' items={Section} style={{ height: 'calc(100vh - 112px)' }} />
        </>
    )
}

export default TabSwitcher;