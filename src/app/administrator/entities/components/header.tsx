//libs
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Space } from "antd";
//components
import GlobalHeader from "@components/admin/header";
//types
interface UserManagementHeaderProps {}
//
const OtherLayout = function (props: UserManagementHeaderProps) {
    return (
        <>
            <GlobalHeader
                title={
                    <Space>
                        <span>DEPARTMENTS</span>
                        <Divider type="vertical" />
                        <span>SECTIONS</span>
                        <Divider type="vertical" />
                        <span>OFFICERS</span>
                        <Divider type="vertical" />
                        <span>UNITS</span>
                    </Space>
                }
            >
                <Button icon={<QuestionCircleOutlined />} type="text" />
            </GlobalHeader>
        </>
    );
};

export default OtherLayout;
