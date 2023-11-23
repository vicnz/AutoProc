"use client";

import { Avatar, AvatarProps, Drawer, DrawerProps } from "antd";
import { ReactNode, useState } from "react";

interface DrawerWrapperProps {
    avatarProps?: AvatarProps;
    drawerProps?: DrawerProps;
    avatarChildren?: ReactNode;
    title?: string;
    children: ReactNode;
}

function DrawerWrapper(props: DrawerWrapperProps) {
    const { avatarProps, drawerProps, title, children, avatarChildren } = props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <Avatar {...avatarProps} onClick={() => setOpen(true)}>
                {avatarChildren}
            </Avatar>
            <Drawer {...drawerProps} open={open} onClose={() => setOpen(false)} title={title}>
                {children}
            </Drawer>
        </>
    );
}

export default DrawerWrapper;
