'use client';

import { Button, ButtonProps, Drawer, DrawerProps, Skeleton } from "antd";
import { useState } from "react";

//types
interface UnitTypeManagementProps {
    isEdit: boolean,
    id?: string,
    buttonProps?: ButtonProps,
    drawerProps?: DrawerProps
}

//Manage Unit Types (CREATE & EDIT)
const UnitTypeManagement = function (props: UnitTypeManagementProps) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)} {...props.buttonProps}>
                {props.isEdit ? "Edit Unit Type" : "Add Unit Type"}
            </Button>
            <Drawer
                {...props.drawerProps}
                onClose={() => setOpen(false)}
                open={open}
                title={props.isEdit ? "Edit Unit" : "Add New Unit"}
            >
                TODO...
                <br />
                <Skeleton active />
            </Drawer>
        </>
    );
};

export default UnitTypeManagement;
