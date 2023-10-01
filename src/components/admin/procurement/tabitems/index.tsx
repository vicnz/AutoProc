'use client';

//libs
import { FolderFilled, FolderOutlined } from '@ant-design/icons'
import { Skeleton, TabsProps } from 'antd'
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react'
//components
import TabPane from './Pane'
// const PurchaseRequest = dynamic(async () => await import('../purchase-request'), { loading: () => <Skeleton active /> })
// const Recommendation = dynamic(async () => await import('../_recomend/index'), { loading: () => <Skeleton active /> })
// const RFQ = dynamic(async () => await import('../_rfq/index'), { loading: () => <Skeleton active /> })
// const Abstract = dynamic(async () => await import('../_abstract/index'), { loading: () => <Skeleton active /> })
// const Awarding = dynamic(async () => await import('../_awarding/index'), { loading: () => <Skeleton active /> })
// const PurchaseOrder = dynamic(async () => await import('../_po/index'), { loading: () => <Skeleton active /> })
//configs

const TabPanes: TabsProps['items'] = [
    {
        key: 'pr',
        label: <span><FolderOutlined /> Purchase Request</span>,
        destroyInactiveTabPane: true,
        tabKey: 'pr',
        children: (
            <TabPane>
                {/* <PurchaseRequest /> */}
            </TabPane>
        ),
    },
    {
        key: 'recommend',
        label: <span><FolderOutlined /> Recommendation</span>,
        destroyInactiveTabPane: true,
        tabKey: 'recommend',
        children: (
            <TabPane>
                {/* <Recommendation /> */}
            </TabPane>
        )
    },
    {
        key: 'rfq',
        label: <span><FolderOutlined /> Request Quotation</span>,
        destroyInactiveTabPane: true,
        tabKey: 'rfq',
        children: (
            <TabPane>
                {/* <RFQ /> */}
            </TabPane>
        )
    },
    {
        key: 'abstract',
        label: <span><FolderOutlined /> Abstract of Quotation</span>,
        destroyInactiveTabPane: true,
        tabKey: 'abstract',
        children: (
            <TabPane>
                {/* <Abstract /> */}
            </TabPane>
        )
    },
    {
        key: 'award',
        label: <span><FolderOutlined /> Awarding & Release</span>,
        destroyInactiveTabPane: true,
        tabKey: 'award',
        children: (
            <TabPane>
                {/* <Awarding /> */}
            </TabPane>
        )
    },
    {
        key: 'po',
        label: <span><FolderOutlined /> Purchase Order</span>,
        destroyInactiveTabPane: true,
        tabKey: 'po',
        children: (
            <TabPane>
                {/* <PurchaseOrder /> */}
            </TabPane>
        )
    },
    {
        key: 'delivery',
        label: <span><FolderOutlined /> Delivery Status</span>,
        destroyInactiveTabPane: true,
        tabKey: 'delivery',
        children: (
            <TabPane>
                {/* <p>Delivery</p> */}
            </TabPane>
        )
    },
]

export default TabPanes;