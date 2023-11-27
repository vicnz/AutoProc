//libs
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Space } from "antd";
import { memo } from "react";
//components
import GlobalHeader from "@components/admin/header";
import { Back } from "@components/loading-btn";
// import BackButton from "./back-btn";
import Link from "next/link";

const UserInfoHeader = function () {
    return (
        <>
            <GlobalHeader
                title={
                    <Space>
                        <span>User Information</span>
                    </Space>
                }
                back={
                    <>
                        <Back icon={<ArrowLeftOutlined />} type="text">
                            Back
                        </Back>
                    </>
                }
            >
                <Divider type="vertical" />
                <Button icon={<QuestionCircleOutlined />} type="text" />
            </GlobalHeader>
        </>
    );
};

export default memo(UserInfoHeader);
