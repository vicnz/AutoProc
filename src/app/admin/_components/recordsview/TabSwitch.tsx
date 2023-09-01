'use client';
import { FileOutlined, FolderOutlined, ShopOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import TabView from './TabView';
import { useEffect } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import PurchaseOrder from './request/layout'


const Section = [
    {
        key: 'pr',
        label: <span><FileOutlined /> Request</span>,
        children: (
            <TabView>
                <PurchaseOrder />
            </TabView>
        )
    },
    {
        key: 'bac-reso',
        label: <span><FolderOutlined /> Recommendation</span>,
        children: (
            <TabView>
                <h1>BAC Resolution Recommending</h1>
            </TabView>
        ),
    },
    {
        key: 'rfq',
        label: <span><FolderOutlined /> RFQ</span>,
        children: (
            <TabView>
                <h1>Request For Price Quotation</h1>
            </TabView>
        ),
    },
    {
        key: 'abstract',
        label: <span><FolderOutlined /> Abstract</span>,
        children: (
            <TabView>
                <h1>Abstract of Quotation</h1>
            </TabView>
        ),
    },
    {
        key: 'awarding',
        label: <span><FolderOutlined /> Award</span>,
        children: (
            <TabView>
                <h1>BAC Resolution for Awarding</h1>
            </TabView>
        ),
    },
    {
        key: 'p-order',
        label: <span><FolderOutlined /> Order</span>,
        children: (
            <TabView>
                <h1>Purchase Order</h1>
            </TabView>
        ),
    },
    {
        key: 'delivery',
        label: <span><ShopOutlined /> Delivery</span>,
        children: (
            <TabView>
                <h1>Delivery Status</h1>
            </TabView>
        ),
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