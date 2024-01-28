"use client";

//libs
import { ArrowLeftOutlined, QrcodeOutlined, QuestionCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Divider, QRCode, Skeleton, Space, Tag } from "antd";
import { memo } from "react";
// import dynamic from "next/dynamic";
//components
import GlobalHeader from "@components/global-header";
import Tracking from './tracking'
import { useRecordId } from './pr-id-provider'
// import Manual from "@components/shared/manual";
import Link from "next/link";
import { useRouter } from 'next/navigation'

// const QRCodeGen = dynamic(async () => await import("@components/admin/procurement/purchase-tracker"), {
//     loading: () => <Skeleton.Button />,
// });

const ProcurementItemHeader = function () {
    const recordID = useRecordId(); //get current active PR id
    console.log(recordID)
    const { refresh } = useRouter()
    return (
        <>
            <GlobalHeader
                title={
                    <Space>
                        <span>Purchase ID</span>
                        <Tag>{recordID}</Tag>
                    </Space>
                }
                back={
                    <Link href={`/administrator/procurement`} passHref>
                        <Button icon={<ArrowLeftOutlined />} type="text">
                            Records
                        </Button>
                    </Link>
                }
            >
                {/* <QRCodeGen /> */}
                <Tracking id={recordID} />
                <Divider type="vertical" />
                <Button icon={<ReloadOutlined />} type="text" onClick={() => refresh()}>Refresh</Button>
                {/* <Divider type="vertical" />
                <Manual
                    icon={<QuestionCircleOutlined />}
                    buttonProps={{ type: "text" }}
                    drawerProps={{ title: "PR View Manual" }}
                    pageProp={{ id: "", name: "Purchase Information" }}
                /> */}
            </GlobalHeader>
        </>
    );
};

export default memo(ProcurementItemHeader);
