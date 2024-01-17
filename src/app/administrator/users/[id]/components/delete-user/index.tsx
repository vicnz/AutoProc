"use client";

import { DeleteOutlined } from "@ant-design/icons";
import { Alert, App, Button, Popconfirm } from "antd";
import React, { useState } from "react";
import { deleteUser } from "./action";
import { useRouter } from "next/navigation";

function Delete(props: { id: string }) {
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);
    const { back } = useRouter();
    //
    const onDeleteUser = async () => {
        setLoading(true);
        const response = await deleteUser(props.id);
        if (response.ok) {
            back();
            setLoading(false);
        } else {
            message.error("An Error Occured");
            setLoading(false);
        }
    };

    return (
        <Alert
            message="Delete User"
            type="error"
            description={
                <>
                    <span>This will disable this users availability in some parts of AutoProc</span>
                    <br />
                    <br />
                    <Popconfirm
                        title="Are you sure you want to disable this User?"
                        onCancel={() => {
                            setLoading(false);
                        }}
                        onConfirm={() => {
                            onDeleteUser();
                        }}
                    >
                        <Button danger icon={<DeleteOutlined />} block type="primary" loading={loading}>
                            Disable User
                        </Button>
                    </Popconfirm>
                </>
            }
        />
    );
}

export default Delete;
