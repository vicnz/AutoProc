// "use client";

/**
 * * - GLOBAL NAVBAR
 * * - Navigation bar as shown in the
 * * - Left side of the page
 */
//libs
import { Button, Space, Tooltip, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { CSSProperties, memo } from "react";
import Link from "next/link";
//
import NavbarRenderedItems from "./nav-items";
//styles
import Styles from "./navbar.module.css";
//
const NavbarWrapperStyle: CSSProperties = {
    height: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "15px",
};

//
const Navbar = function () {
    const pathname = usePathname();
    const { token } = theme.useToken();
    const { push } = useRouter()

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
                                <Link href={item.href} passHref prefetch={true}>
                                    <Button
                                        type="link"
                                        icon={<NavIcon />}
                                        className={isLinkActive(
                                            pathname,
                                            item.href as string,
                                            Styles.itemActive
                                        )}
                                        onClick={() => { }}
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
                                <Link href={item.href} passHref prefetch={true}>
                                    <Button
                                        type="link"
                                        icon={<NavIcon />}
                                        className={isLinkActive(
                                            pathname,
                                            item.href,
                                            Styles.itemActive
                                        )}
                                        onClick={() => { }}
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
