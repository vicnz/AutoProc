//libs
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Space } from "antd";
import { memo } from "react";
//components
import GlobalHeader from "@components/admin/header";
import LoadingButton from "@components/loading-btn";
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
                        <Link href="/administrator/users" passHref>
                            <LoadingButton icon={<ArrowLeftOutlined />} type="text">
                                Back
                            </LoadingButton>
                        </Link>
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
