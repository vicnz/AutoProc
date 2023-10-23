"use client";

/**
 * * - GLOBAL TOPBAR COMPONENT
 * * - Navbar consist of the
 * * - Page Logo, Search, and Notification Area
 */

//libs
import Image from "next/image";
import { Space, Tag, theme } from "antd";
import { memo } from "react";
//components
import LogoSmall from "@media/small.png";
import LogoMedium from "@media/medium.png";
import SearchBar from "@components/admin/search";
import dynamic from "next/dynamic";
const Notify = dynamic(async () => await import('@components/admin/notifications/notify'), { ssr: false })
const Notification = dynamic(async () => await import('@components/admin/notifications'), { ssr: false })
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
            <Space>
                <Image
                    src={LogoSmall}
                    alt="Auto Proc Logo Small"
                    height={25}
                    width={25}
                    style={{ objectFit: "contain" }}
                />
                <div />
                <Image
                    src={LogoMedium}
                    alt="Auto Proc Logo Medium"
                    height={15}
                    width={100}
                    style={{ objectFit: "contain" }}
                />
                <Tag color="red">ALPHA</Tag>
            </Space>
            <SearchBar />
            <div>
                <Notify />
                <Notification />
            </div>
        </nav>
    );
};

export default memo(Topbar);
