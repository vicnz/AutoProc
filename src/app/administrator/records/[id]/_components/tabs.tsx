'use client';

//libs
import { FolderFilled } from '@ant-design/icons'
import { TabsProps } from 'antd'
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react'
//components
const PurchaseRequest = dynamic(async () => await import('../_pr/index'))
const Recommendation = dynamic(async () => await import('../_recomend/index'))
const RFQ = dynamic(async () => await import('../_rfq/index'))
const Abstract = dynamic(async () => await import('../_abstract/index'))
const Awarding = dynamic(async () => await import('../_awarding/index'))
const PurchaseOrder = dynamic(async () => await import('../_po/index'))
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
        label: <span><FolderFilled /> Purchase Request</span>,
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
        label: <span><FolderFilled /> Recommendation</span>,
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
        label: <span><FolderFilled /> Request Quotation</span>,
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
        label: <span><FolderFilled /> Abstract of Quotation</span>,
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
        label: <span><FolderFilled /> Awarding & Release</span>,
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
        label: <span><FolderFilled /> Purchase Order</span>,
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
        label: <span><FolderFilled /> Delivery Status</span>,
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