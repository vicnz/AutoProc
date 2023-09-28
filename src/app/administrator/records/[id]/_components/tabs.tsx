'use client';

//libs
import { FolderFilled, FolderOutlined } from '@ant-design/icons'
import { Skeleton, TabsProps } from 'antd'
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react'
//components
const PurchaseRequest = dynamic(async () => await import('../_pr/index'), { loading: () => <Skeleton active /> })
const Recommendation = dynamic(async () => await import('../_recomend/index'), { loading: () => <Skeleton active /> })
const RFQ = dynamic(async () => await import('../_rfq/index'), { loading: () => <Skeleton active /> })
const Abstract = dynamic(async () => await import('../_abstract/index'), { loading: () => <Skeleton active /> })
const Awarding = dynamic(async () => await import('../_awarding/index'), { loading: () => <Skeleton active /> })
const PurchaseOrder = dynamic(async () => await import('../_po/index'), { loading: () => <Skeleton active /> })
//configs
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
        key: 'pr',
        label: <span><FolderOutlined /> Purchase Request</span>,
        destroyInactiveTabPane: true,
        tabKey: 'pr',
        children: (
            <TabPaneWrapper>
                <PurchaseRequest />
            </TabPaneWrapper>
        ),
    },
    {
        key: 'recommend',
        label: <span><FolderOutlined /> Recommendation</span>,
        destroyInactiveTabPane: true,
        tabKey: 'recommend',
        children: (
            <TabPaneWrapper>
                <Recommendation />
            </TabPaneWrapper>
        )
    },
    {
        key: 'rfq',
        label: <span><FolderOutlined /> Request Quotation</span>,
        destroyInactiveTabPane: true,
        tabKey: 'rfq',
        children: (
            <TabPaneWrapper>
                <RFQ />
            </TabPaneWrapper>
        )
    },
    {
        key: 'abstract',
        label: <span><FolderOutlined /> Abstract of Quotation</span>,
        destroyInactiveTabPane: true,
        tabKey: 'abstract',
        children: (
            <TabPaneWrapper>
                <Abstract />
            </TabPaneWrapper>
        )
    },
    {
        key: 'award',
        label: <span><FolderOutlined /> Awarding & Release</span>,
        destroyInactiveTabPane: true,
        tabKey: 'award',
        children: (
            <TabPaneWrapper>
                <Awarding />
            </TabPaneWrapper>
        )
    },
    {
        key: 'po',
        label: <span><FolderOutlined /> Purchase Order</span>,
        destroyInactiveTabPane: true,
        tabKey: 'po',
        children: (
            <TabPaneWrapper>
                <PurchaseOrder />
            </TabPaneWrapper>
        )
    },
    {
        key: 'delivery',
        label: <span><FolderOutlined /> Delivery Status</span>,
        destroyInactiveTabPane: true,
        tabKey: 'delivery',
        children: (
            <TabPaneWrapper>
                <p>Delivery</p>
            </TabPaneWrapper>
        )
    },
]

export default TabPanes;