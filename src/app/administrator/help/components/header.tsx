//libs
import { QuestionCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
//components
import GlobalHeader from "@components/admin/header";

const HelpLayout = function (props: any) {
    return (
        <>
            <GlobalHeader title="HELP & FEEDBACK">
                <Button icon={<QuestionCircleOutlined />} type="text" />
            </GlobalHeader>
        </>
    );
};

export default HelpLayout;
