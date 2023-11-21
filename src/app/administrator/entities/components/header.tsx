//libs
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Divider, Space } from "antd";
//components
import GlobalHeader from "@components/admin/header";
import Manual from "@components/shared/manual";
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
                <Manual
                    icon={<QuestionCircleOutlined />}
                    buttonProps={{ type: "text" }}
                    drawerProps={{ title: "Entities Manual" }}
                    pageProp={{ id: "", name: "Entities" }}
                />
            </GlobalHeader>
        </>
    );
};

export default OtherLayout;
