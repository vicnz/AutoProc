import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
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
