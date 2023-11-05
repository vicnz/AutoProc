"use client";

import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Button, ButtonProps, Drawer, Result, Skeleton } from "antd";
import dynamic from "next/dynamic";
import { PropsWithChildren, memo, useState } from "react";
//
const PreloadWithData = dynamic(async () => await import("./preload"), { loading: () => <Skeleton active /> });
const Form = dynamic(async () => await import("./form"), {
    loading: () => <Skeleton active />,
});

type UserCrudProps = {
    edit?: boolean; //is view or edit
    id?: string;
};
//
const UserCrud = (props: PropsWithChildren<UserCrudProps & ButtonProps> = { edit: false }) => {
    const { edit, id } = props;
    const [open, setOpen] = useState(false);
    const content = edit ? "Edit" : "Add New";
    return (
        <>
            <Button onClick={() => setOpen(true)} type="text" icon={edit ? <UserOutlined /> : <UserAddOutlined />}>
                {props.children || content}
            </Button>
            <Drawer open={open} onClose={() => setOpen(false)} title={content} destroyOnClose>
                {edit ? (
                    <>
                        <PreloadWithData id={id as string} close={() => setOpen(false)} />
                    </>
                ) : (
                    <>
                        <Form data={{}} close={() => setOpen(false)} />
                    </>
                )}
            </Drawer>
        </>
    );
};

export default memo(UserCrud);
