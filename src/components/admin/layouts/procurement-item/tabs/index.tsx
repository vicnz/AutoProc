'use client';
//libs
import {
    AuditOutlined,
    BlockOutlined,
    ContactsOutlined,
    FieldTimeOutlined, ShopOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined
} from "@ant-design/icons";
import { Skeleton, TabsProps } from "antd";
import dynamic from "next/dynamic";
//components
import TabPane from "./panel";

//Sections
const PurchaseRequest = dynamic(
    async () => await import("@components/admin/procurement/purchase-request"),
    { loading: () => <Skeleton active /> }
);
const Recommendation = dynamic(
    async () =>
        await import("@components/admin/procurement/purchase-recommendation"),
    { loading: () => <Skeleton active /> }
);
const RFQ = dynamic(
    async () =>
        await import("@components/admin/procurement/purchase-price-quotation"),
    { loading: () => <Skeleton active /> }
);
const Abstract = dynamic(
    async () =>
        await import("@components/admin/procurement/purchase-abstract-quotation"),
    { loading: () => <Skeleton active /> }
);
const Awarding = dynamic(
    async () => await import("@components/admin/procurement/purchase-awarding"),
    { loading: () => <Skeleton active /> }
);
// const PurchaseOrder = dynamic(async () => await import('../_po/index'), { loading: () => <Skeleton active /> })
//configs

const TabPanes: TabsProps["items"] = [
    {
        key: "pr",
        label: (
            <span>
                <ShoppingOutlined /> Purchase Request
            </span>
        ),
        destroyInactiveTabPane: true,
        tabKey: "pr",
        children: (
            <TabPane>
                <PurchaseRequest />
            </TabPane>
        ),
    },
    {
        key: "recommend",
        label: (
            <span>
                <ContactsOutlined /> Recommendation
            </span>
        ),
        destroyInactiveTabPane: true,
        tabKey: "recommend",
        children: (
            <TabPane>
                <Recommendation />
            </TabPane>
        ),
    },
    {
        key: "rfq",
        label: (
            <span>
                <ShopOutlined /> Request Quotation
            </span>
        ),
        destroyInactiveTabPane: true,
        tabKey: "rfq",
        children: (
            <TabPane>
                <RFQ />
            </TabPane>
        ),
    },
    {
        key: "abstract",
        label: (
            <span>
                <BlockOutlined /> Abstract of Quotation
            </span>
        ),
        destroyInactiveTabPane: true,
        tabKey: "abstract",
        children: (
            <TabPane>
                <Abstract />
            </TabPane>
        ),
    },
    {
        key: "award",
        label: (
            <span>
                <AuditOutlined /> Awarding & Release
            </span>
        ),
        destroyInactiveTabPane: true,
        tabKey: "award",
        children: (
            <TabPane>
                <Awarding />
            </TabPane>
        ),
    },
    {
        key: "po",
        label: (
            <span>
                <ShoppingCartOutlined /> Purchase Order
            </span>
        ),
        destroyInactiveTabPane: true,
        tabKey: "po",
        children: <TabPane>{/* <PurchaseOrder /> */}</TabPane>,
    },
    {
        key: "delivery",
        label: (
            <span>
                <FieldTimeOutlined /> Delivery Status
            </span>
        ),
        destroyInactiveTabPane: true,
        tabKey: "delivery",
        children: <TabPane>{/* <p>Delivery</p> */}</TabPane>,
    },
];

export default TabPanes;
