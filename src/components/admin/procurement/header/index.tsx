"use client";
//libs
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Skeleton, Space, Tag } from "antd";
import { useRouter } from "next/navigation";
import { memo } from "react";
import dynamic from "next/dynamic";
//components
import GlobalHeader from "@components/admin/header";
import { usePRId } from "@components/admin/PRId";

const QRCodeGen = dynamic(async () => await import('@components/admin/QRCode'), { loading: () => <Skeleton.Button /> })

const ProcurementItemHeader = function () {
    const prId = usePRId(); //get current active PR id
    const { back } = useRouter();
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
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => back()}
                        type="text"
                    >
                        Records
                    </Button>
                }
            >
                <QRCodeGen id={prId} />
            </GlobalHeader>
        </>
    );
};

export default memo(ProcurementItemHeader);
