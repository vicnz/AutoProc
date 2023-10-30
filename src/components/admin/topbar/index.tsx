"use client";

/**
 * * - GLOBAL TOPBAR COMPONENT
 * * - Navbar consist of the
 * * - Page Logo, Search, and Notification Area
 */

//libs
import { Button, Divider, Skeleton, Space, theme } from "antd";
import { memo } from "react";
import dynamic from "next/dynamic";
import AvatarBoring from "boring-avatars";
import { EllipsisOutlined, NotificationOutlined } from "@ant-design/icons";
//components
const Search = dynamic(async () => await import('@components/admin/search'), { loading: () => <Skeleton.Input /> })
const PageLogo = dynamic(async () => await import("./logo"), { loading: () => <Skeleton.Input /> });
const Notify = dynamic(async () => await import("@components/admin/notifications/notify"), { ssr: false });
const Notification = dynamic(async () => await import("@components/admin/notifications"), { ssr: false });
//
const topBarStyle = {
    height: "56px",
    padding: "10px 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};
//
const Topbar = function () {
    const { token } = theme.useToken();
    return (
        <nav style={{ ...topBarStyle, backgroundColor: token.colorBgContainer }}>
            <PageLogo />
            <Search />
            <Space>
                <Notification />
                <Divider type="vertical" />
                <div
                    onClick={() => {
                        alert("Authentication Requires To Be Implemented First");
                    }}
                    style={{ cursor: "pointer", display: "grid", placeItems: "center" }}
                >
                    <AvatarBoring size={28} variant="beam" name="Jennie" />
                </div>
                {/* Start Listening to Notification */}
                <Notify />
            </Space>
        </nav>
    );
};

export default memo(Topbar);
