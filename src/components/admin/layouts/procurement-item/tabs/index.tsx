"use client";
//libs
import {
    AuditOutlined,
    BlockOutlined,
    ContactsOutlined,
    FieldTimeOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
} from "@ant-design/icons";
import { Skeleton, TabsProps } from "antd";
import dynamic from "next/dynamic";
//components
import TabPane from "@components/admin/layouts/procurement-item/tabs/panel";
//PURCHASE ORDER
const PurchaseRequest = dynamic(async () => await import("@components/admin/procurement/purchase-request"), {
    loading: () => <Skeleton active />,
});
//RECOMMENDATION SECTION
const Recommendation = dynamic(async () => await import("@components/admin/procurement/purchase-recommendation"), {
    loading: () => <Skeleton active />,
});
//RFQ SECTION
const RFQ = dynamic(async () => await import("@components/admin/procurement/purchase-price-quotation"), {
    loading: () => <Skeleton active />,
});
//ABSTRACT OF QUOTATION SECTION
const Abstract = dynamic(async () => await import("@components/admin/procurement/purchase-abstract-quotation"), {
    loading: () => <Skeleton active />,
});
//AWARDING SECTION
const Awarding = dynamic(async () => await import("@components/admin/procurement/purchase-awarding"), {
    loading: () => <Skeleton active />,
});
//PURCHASE ORDER SECTION
const PurchaseOrder = dynamic(async () => await import("@components/admin/procurement/purchase-order"), {
    loading: () => <Skeleton active />,
});
//DELIVERY SECTION
const Delivery = dynamic(async () => await import("@components/admin/procurement/purchase-delivery"), {
    loading: () => <Skeleton active />,
});

const TabPanes: TabsProps["items"] = [
    {
        key: "pr",
        label: (
            <span>
                <ShoppingOutlined /> Purchase Request
            </span>
        ),

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

        tabKey: "po",
        children: (
            <TabPane>
                <PurchaseOrder />
            </TabPane>
        ),
    },
    {
        key: "delivery",
        label: (
            <span>
                <FieldTimeOutlined /> Delivery Status
            </span>
        ),

        tabKey: "delivery",
        children: (
            <TabPane>
                <Delivery />
            </TabPane>
        ),
    },
];

export default TabPanes;
