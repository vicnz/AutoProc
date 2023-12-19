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
            <GlobalHeader title={<span>OTHERS</span>}>
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
