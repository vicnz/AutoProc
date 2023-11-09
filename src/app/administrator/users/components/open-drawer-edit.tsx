"use client";

import { Button, ButtonProps, Drawer } from "antd";
import { PropsWithChildren, ReactNode, useState } from "react";

type UserFormDrawer = {
    content: ReactNode;
    title: ReactNode;
    btnProps?: ButtonProps;
};

function UserFormDrawer(props: PropsWithChildren<UserFormDrawer>) {
    const { btnProps, children, content, title } = props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button {...btnProps} onClick={() => setOpen(true)}>
                {content}
            </Button>
            <Drawer open={open} onClose={() => setOpen(false)} title={title} destroyOnClose>
                {children}
            </Drawer>
        </>
    );
}

export default UserFormDrawer;
