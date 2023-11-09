//libs
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Space } from "antd";
import { memo } from "react";
//components
import GlobalHeader from "@components/admin/header";
import BackButton from "./back-btn";

const UserInfoHeader = function () {
    return (
        <>
            <GlobalHeader
                title={
                    <Space>
                        <span>User Information</span>
                    </Space>
                }
                back={<BackButton />}
            >
                <Divider type="vertical" />
                <Button icon={<QuestionCircleOutlined />} type="text" />
            </GlobalHeader>
        </>
    );
};

export default memo(UserInfoHeader);
