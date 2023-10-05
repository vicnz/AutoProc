"use client";

//libs
import {
    AppstoreOutlined,
    FolderOutlined,
    HomeOutlined,
    QuestionOutlined,
    SettingOutlined,
    ShopOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip, theme } from "antd";
import { usePathname } from "next/navigation";
import { CSSProperties, memo } from "react";
import Link from "next/link";
//styles
import Styles from "./navbar.module.css";
const NavbarWrapperStyle: CSSProperties = {
    height: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "15px",
};

//types
type INavbarItemType = {
    key: string;
    href?: string;
    icon?: any;
    label?: string;
    disabled?: boolean;
    type?: "separator";
};

//Rendered Navigation Items
const NavbarRenderedItems: {
    top: INavbarItemType[];
    bottom: INavbarItemType[];
} = {
    top: [
        {
            key: "dashboard",
            href: "/administrator",
            icon: HomeOutlined,
            label: "Dashboard",
        },
        {
            key: "records",
            href: "/administrator/procurements",
            icon: FolderOutlined,
            label: "Records",
        },
        {
            key: "user",
            href: "/administrator/users",
            icon: TeamOutlined,
            label: "End Users",
        },
        { key: "separator1", type: "separator" },
        {
            key: "suppliers",
            href: "/administrator/suppliers",
            icon: ShopOutlined,
            label: "Suppliers",
        },
        {
            key: "entity",
            href: "/administrator/others",
            icon: AppstoreOutlined,
            label: "Others",
        },
    ],
    bottom: [
        {
            key: "help",
            href: "/administrator/help",
            icon: QuestionOutlined,
            label: "Help & Feedback",
        },
        {
            key: "settings",
            href: "/administrator/settings",
            icon: SettingOutlined,
            label: "Settings",
        },
    ],
};
//
const Navbar = function () {
    const pathname = usePathname();
    const { token } = theme.useToken();

    return (
        <div
            style={{ ...NavbarWrapperStyle, backgroundColor: token.colorBgContainer }}
        >
            {/* TOP SECTION */}
            <Space direction="vertical">
                {NavbarRenderedItems.top.map((item) => {
                    if (item?.type === "separator") {
                        return <hr key={item?.key} />;
                    } else {
                        const NavIcon = typeof item.icon !== "undefined" ? item.icon : null;
                        return (
                            <Tooltip title={item.label} placement="right" key={item.key}>
                                <Link href={item?.href as string}>
                                    <Button
                                        type="text"
                                        icon={<NavIcon />}
                                        className={isLinkActive(
                                            pathname,
                                            item.href as string,
                                            Styles.itemActive
                                        )}
                                    />
                                </Link>
                            </Tooltip>
                        );
                    }
                })}
            </Space>
            {/* BOTTOM SECTION */}
            <Space direction="vertical">
                {NavbarRenderedItems.bottom.map((item) => {
                    if (item?.type === "separator") {
                        return <hr key={item?.key} />;
                    } else {
                        const NavIcon = typeof item.icon !== "undefined" ? item.icon : null;
                        return (
                            <Tooltip title={item.label} placement="right" key={item.key}>
                                <Link href={item?.href as string}>
                                    <Button
                                        type="text"
                                        icon={<NavIcon />}
                                        className={isLinkActive(
                                            pathname,
                                            item.href as string,
                                            Styles.itemActive
                                        )}
                                    />
                                </Link>
                            </Tooltip>
                        );
                    }
                })}
            </Space>
        </div>
    );
};

// CHECK IF LINK IS ACTIVE
const isLinkActive = (path: string, url: string, className: any): string => {
    return `${path === url ? className : ""}`;
};

export default memo(Navbar);
