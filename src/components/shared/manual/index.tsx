"use client";

import { Button, ButtonProps, Drawer, DrawerProps, Result } from "antd";
import React, { PropsWithChildren, ReactNode, useState } from "react";

type ManualWrapperProps = {
    buttonProps: ButtonProps;
    drawerProps: DrawerProps;
    icon: ReactNode;
    pageProp: {
        id: string;
        name?: string;
    };
};
function ManualWrapper(props: PropsWithChildren<ManualWrapperProps>) {
    const { buttonProps, drawerProps, icon, children } = props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button {...buttonProps} icon={icon} onClick={() => setOpen(true)} />
            <Drawer {...drawerProps} onClose={() => setOpen(false)} open={open}>
                <Result
                    status="warning"
                    title={`TODO`}
                    subTitle={`This Panel Contains the Manual For The Section ${props.pageProp?.name}`}
                />
            </Drawer>
        </>
    );
}

export default ManualWrapper;
