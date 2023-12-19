//libs
import { BugOutlined } from "@ant-design/icons";
import { Button } from "antd";
//components
import GlobalHeader from "@components/admin/header";
import Feedback from "./feedback";

const HelpLayout = function (props: any) {
    return (
        <>
            <GlobalHeader title="HELP & FEEDBACK">
                <Feedback />
            </GlobalHeader>
        </>
    );
};

export default HelpLayout;
