"use client";
//libs
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Skeleton, Space, Tag } from "antd";
import { useRouter } from "next/navigation";
import { memo } from "react";
import dynamic from "next/dynamic";
//components
import GlobalHeader from "@components/admin/header";
import { usePRId } from "@components/admin/PRId";
import Link from "next/link";

const QRCodeGen = dynamic(async () => await import('@components/admin/QRCode'), { loading: () => <Skeleton.Button /> })

const ProcurementItemHeader = function () {
    const prId = usePRId(); //get current active PR id
    const { replace } = useRouter();
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
                        <Button
                            icon={<ArrowLeftOutlined />}
                            type="text"
                        >
                            Records
                        </Button>
                    </Link>
                }
            >
                <QRCodeGen id={prId} />
                <Divider type='vertical' />
                <Button icon={<QuestionCircleOutlined />} type='text' />
            </GlobalHeader>
        </>
    );
};

export default memo(ProcurementItemHeader);
