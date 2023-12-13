//libs
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Space } from "antd";
import { memo } from "react";
//components
import GlobalHeader from "@components/admin/header";
import { Back } from "@components/loading-btn";
import Manual from "./manual";

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
                <Manual />
            </GlobalHeader>
        </>
    );
};

export default memo(UserInfoHeader);
