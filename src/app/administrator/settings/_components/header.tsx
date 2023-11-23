//libs
import { QuestionCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
//components
import GlobalHeader from "@components/admin/header";

const SettingsLayout = function (props: any) {
    return (
        <>
            <GlobalHeader title="SETTINGS">
                <Button icon={<QuestionCircleOutlined />} type="text" />
            </GlobalHeader>
        </>
    );
};

export default SettingsLayout;
