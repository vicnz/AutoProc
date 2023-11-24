"use client";

/**
 * * OPENS LINK OR COPIES CONTENT
 */

import { CopyOutlined, LinkOutlined } from "@ant-design/icons";
import { App, Dropdown } from "antd";
import type { DropdownProps, MenuProps } from "antd";
import { PropsWithChildren, memo, useCallback, useMemo } from "react";
import { useCopyToClipboard } from "react-use";

type ViewLinkProps = {
    href: string;
    hrefType: "email" | "phone" | "url" | string;
} & DropdownProps;

const LinkDetails = function (props: PropsWithChildren<ViewLinkProps>) {
    const { message } = App.useApp();
    const { href, hrefType, ...rest } = props;
    const [copyState, setCopyState] = useCopyToClipboard();

    const onOpenLink = useCallback(() => {
        if (window) {
            switch (hrefType) {
                case "email":
                    window.open(`mailto:${href}`);
                    break;
                case "phone":
                    window.open(`tel:${href}`);
                case "url":
                    window.open(`${href}`, `_blank`);
                default:
                    window.open(href, `_blank`);
            }
        }
    }, [hrefType, href]);

    const onCopy = useCallback(() => {
        setCopyState(href);
        message.open({ content: `${copyState.value} was copied to the clipboard` });
    }, [href, copyState, message, setCopyState]);

    const menuProps: MenuProps["items"] = useMemo(
        () => [
            {
                label: <span>Open Link</span>,
                icon: <LinkOutlined />,
                key: "open-link",
                onClick: () => onOpenLink(),
            },
            {
                label: <span>Copy Link</span>,
                icon: <CopyOutlined />,
                key: "copy",
                onClick: () => onCopy(),
            },
        ],
        [onCopy, onOpenLink]
    );

    return (
        <>
            <Dropdown {...rest} menu={{ items: menuProps }} trigger={["contextMenu", "click"]}>
                {props.children}
            </Dropdown>
        </>
    );
};

export default LinkDetails;
