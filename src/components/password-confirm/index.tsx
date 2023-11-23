"use client";

import { App, Input, Modal } from "antd";
import { useState } from "react";

//use Password Confirm [ONLY AVAILABE FOR ADMIN FOR THE MEAN TIME]
export const useConfirm = (userid: string, callback: (value: boolean) => any) => {
    const [open, setOpen] = useState(false); //OPEN MODAL

    const trigger = () => {
        //OPEN MODAL
        setOpen(true);
    };

    const onConfirmed = (value: boolean) => {
        //TRIGGER AFTER CONFIRMATION OF PASSWORD
        callback(value);
    };

    //RENDER CONFIRM DIALOG
    const RenderConfirmDialog = (props: { userid: string; onConfirm: (value: boolean) => any }) => {
        const { message } = App.useApp();
        const [input, setInput] = useState(""); //INPUT PASSWORD
        const [loading, setLoading] = useState(false); //LOADING STATE

        const onValidated = async () => {
            //ON PASSWORD VALIDATE
            if (input.length < 1 || input == null) {
                message.open({ type: "warning", content: "Please Enter Your Password" });
            } else {
                setLoading(true);
                //FETCH API
                const request = await fetch("/administrator/api/profile/confirm-password", {
                    method: "POST",
                    body: JSON.stringify({
                        id: props.userid,
                        password: input,
                    }),
                });

                const req = await request.json();
                if (req?.error) {
                    message.open({ type: "error", content: req.message });
                    props.onConfirm(false); //SET VALUE
                    setLoading(false); //REMOVE LOADING
                } else {
                    props.onConfirm(true); //SET VALUE
                    setLoading(false); //REMOVE LOADING
                    setOpen(false); // DESTROY MODAL
                }
            }
        };

        const onCancel = async () => {
            // ON CANCEL
            setOpen(false);
        };
        return (
            <>
                <Modal
                    closeIcon={null}
                    maskClosable={false}
                    title="Confirm Password"
                    open={open}
                    onCancel={onCancel}
                    destroyOnClose
                    onOk={onValidated}
                    centered
                    width={400}
                    okButtonProps={{ loading: loading }}
                    cancelButtonProps={{
                        disabled: loading,
                    }}
                >
                    <br />
                    Required Password Confirmation to Allow Operation
                    <br />
                    <br />
                    <Input.Password
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Your Current Password"
                    />
                </Modal>
            </>
        );
    };

    return {
        Component: <RenderConfirmDialog userid={userid} onConfirm={onConfirmed} />,
        trigger: () => trigger(),
    };
};
