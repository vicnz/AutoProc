"use client";

/**
 * * PROCUREMENT ITEM HEADER
 * * SHARED HEADER
 */

//libs
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Skeleton, Space, Tag } from "antd";
import { memo } from "react";
import dynamic from "next/dynamic";
//components
import GlobalHeader from "@components/admin/header";
import Manual from "@components/shared/manual";
import { usePRId } from "@components/admin/procurement/purchase-id-context";
import Link from "next/link";

const QRCodeGen = dynamic(async () => await import("@components/admin/procurement/purchase-tracker"), {
    loading: () => <Skeleton.Button />,
});

const ProcurementItemHeader = function () {
    const prId = usePRId(); //get current active PR id
    return (
        <>
            <GlobalHeader
                title={
                    <Space>
                        <span>Purchase ID</span>
                        <Tag>{prId}</Tag>
                    </Space>
                }
                back={
                    <Link href={`/administrator/procurements`} passHref>
                        <Button icon={<ArrowLeftOutlined />} type="text">
                            Records
                        </Button>
                    </Link>
                }
            >
                <QRCodeGen />
                <Divider type="vertical" />
                <Manual
                    icon={<QuestionCircleOutlined />}
                    buttonProps={{ type: "text" }}
                    drawerProps={{ title: "PR View Manual" }}
                    pageProp={{ id: "", name: "Purchase Information" }}
                />
            </GlobalHeader>
        </>
    );
};

export default memo(ProcurementItemHeader);
