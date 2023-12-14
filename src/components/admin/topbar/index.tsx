/**
 * * - GLOBAL TOPBAR COMPONENT
 * * - Navbar consist of the
 * * - Page Logo, Search, and Notification Area
 */

//libs
import { Divider, Skeleton, Space, theme } from "antd";
import { memo } from "react";
import dynamic from "next/dynamic";
//components
const Search = dynamic(async () => await import("@components/admin/search"), { loading: () => <Skeleton.Input /> });
const Notification = dynamic(async () => await import("@components/admin/notifications"), { ssr: false });
const AdminProfile = dynamic(async () => await import("@components/admin/admin-preview"), {
    loading: () => <Skeleton.Avatar />,
});
// const Notify = dynamic(async () => await import("@components/admin/notifications/notify"), { ssr: false });
import PageLogo from "./logo";
import Styles from "./styles.module.css";

const Topbar = function () {
    const { token } = theme.useToken();
    return (
        <nav style={{ backgroundColor: token.colorBgContainer }} className={Styles.topBarStyle}>
            <PageLogo />
            <Search />
            <Space>
                <Notification />
                <Divider type="vertical" />
                <AdminProfile />
                {/* Start Listening to Notification */}
                {/* <Notify /> */}
                {/* Start Listening to Notification */}
            </Space>
        </nav>
    );
};

export default memo(Topbar);
