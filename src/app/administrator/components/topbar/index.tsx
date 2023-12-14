//libs
import { Divider, Flex, Skeleton } from "antd";
import { memo } from "react";
import dynamic from "next/dynamic";
import Search from "../search";
import Wrapper from "./wrapper";
import PageLogo from "./logo";
const Notification = dynamic(async () => await import("../notifications"), { ssr: false });
const AdminProfile = dynamic(async () => await import("../profile-view"), { loading: () => <Skeleton.Avatar /> });

const Topbar = function () {
    return (
        <Wrapper>
            <PageLogo />
            <Search />
            <Flex align="center" gap={10}>
                <Notification />
                <Divider type="vertical" />
                <AdminProfile />
            </Flex>
        </Wrapper>
    );
};

export default memo(Topbar);
