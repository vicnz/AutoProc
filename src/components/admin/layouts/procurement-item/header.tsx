"use client";
//libs
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Space, Tag } from "antd";
import { useRouter } from "next/navigation";
//components
import GlobalHeader from "@components/admin/header";
import { usePRId } from '@components/admin/PRId'
import { memo } from "react";

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
                {/* QR CODE GENERATOR TODO */}
            </GlobalHeader>
        </>
    );
};

export default memo(ProcurementItemHeader);
