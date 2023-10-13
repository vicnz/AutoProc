import { Button, ButtonProps, Drawer, DrawerProps, Skeleton } from "antd";
import { ReactNode, useState } from "react";

//types
interface SupplierManagementProps {
    isEdit: boolean;
    id?: string;
    buttonProps?: ButtonProps;
    drawerProps?: DrawerProps;
    children?: ReactNode
}

// Manage Supplier Information (ADD | EDIT)
const SupplierManagement = function (props: SupplierManagementProps) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)} {...props.buttonProps}>
                {props.isEdit ? (props.children || "Edit Supplier") : (props.children || "Add New Supplier")}
            </Button>
            <Drawer
                {...props.drawerProps}
                onClose={() => setOpen(false)}
                open={open}
                title={props.isEdit ? "Edit Supplier" : "Add New Supplier"}
            >
                TODO...
                <br />
                <Skeleton active />
            </Drawer>
        </>
    );
};

export default SupplierManagement;
