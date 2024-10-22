"use client";

/**
 * * OPENS LINK OR COPIES CONTENT
 */

import { CopyOutlined, LinkOutlined } from "@ant-design/icons";
import { App, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { PropsWithChildren, memo, useMemo } from "react";

const LinkDetails = function (props: PropsWithChildren<{ text: string; type: "email" | "phone" | "url" | string }>) {
    const { message } = App.useApp();
    const menuProps: MenuProps["items"] = useMemo(
        () => [
            {
                label: <span>Visit Link</span>,
                icon: <LinkOutlined />,
                key: "visit-link",
                onClick: () => {
                    if (window) {
                        if (props.type === "email") {
                            window.open(`mailto:${props.text}`);
                        } else if (props.type === "phone") {
                            window.open(`tel:${props.text}`);
                        } else if (props.type === "url") {
                            window.open(`${props.text}`, "_blank");
                        } else {
                            window.open(`${props.text}`);
                        }
                    }
                },
            },
            {
                label: <span>Copy Text</span>,
                icon: <CopyOutlined />,
                key: "copy",
                onClick: async () => {
                    message.info("Copied Link", 2);
                    if (window && window.navigator.clipboard) {
                        window.navigator.clipboard.writeText(props.text);
                    }
                },
            },
        ],
        [props, message]
    );

    return (
        <>
            <Dropdown menu={{ items: menuProps }} trigger={["contextMenu", "click"]}>
                {props.children}
            </Dropdown>
        </>
    );
};

export default memo(LinkDetails);
