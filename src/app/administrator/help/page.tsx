//TODO HELP & FEEDBACK
// Requires In Solicited Data

import { Empty, Flex, Result } from "antd";

const Page = function () {
    return (
        <Flex align="center" justify="center">
            <Result
                icon={<Empty description="" />}
                title="Help & Feedback"
                subTitle="This section holds the Autoproc Manual and Bug Tracker Utilities"
                status={"warning"}
            />
        </Flex>
    );
};

export default Page;
