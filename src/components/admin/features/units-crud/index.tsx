'use client';

import { Button, ButtonProps, Drawer, ModalProps, Modal, Skeleton } from "antd";
import { useState } from "react";

//types
interface UnitTypeManagementProps {
    isEdit: boolean,
    id?: string,
    buttonProps?: ButtonProps,
    modalProps?: ModalProps,
}

//Manage Unit Types (CREATE & EDIT)
const UnitTypeManagement = function (props: UnitTypeManagementProps) {
    const { modalProps, id, isEdit, buttonProps } = props
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)} {...props.buttonProps}>
                {props.isEdit ? "Edit Unit Type" : "Add Unit Type"}
            </Button>
            <Modal {...modalProps} onCancel={() => setOpen(false)} open={open} title={isEdit ? "Edit Unit Type" : "Add New Unit Type"}>
                <Skeleton />
            </Modal>
        </>
    );
};

export default UnitTypeManagement;
