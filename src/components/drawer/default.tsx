"use client";

import { Button, ButtonProps, Drawer, DrawerProps } from "antd";
import { ReactNode, useState } from "react";

interface DrawerWrapperProps {
    buttonProps?: ButtonProps;
    drawerProps?: DrawerProps;
    buttonChildren?: ReactNode;
    title?: string;
    children: ReactNode;
}

function DrawerWrapper(props: DrawerWrapperProps) {
    const { buttonProps, drawerProps, title, children, buttonChildren } = props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button {...buttonProps} onClick={() => setOpen(true)}>
                {buttonChildren}
            </Button>
            <Drawer {...drawerProps} open={open} onClose={() => setOpen(false)} title={title}>
                {children}
            </Drawer>
        </>
    );
}

export default DrawerWrapper;
