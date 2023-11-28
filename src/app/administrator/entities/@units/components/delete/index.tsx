"use client";

import { DeleteOutlined } from "@ant-design/icons";
import { App, Button, Popconfirm } from "antd";
import React from "react";
import { deleteUnit } from "./action";

function DeleteUnit(props: { id: string; name: string }) {
    const { message } = App.useApp();
    return (
        <Popconfirm
            onConfirm={async () => {
                const result = await deleteUnit(props.id);
                if (result.error) {
                    message.error(`An Error Occured ${result.message}`);
                }
            }}
            onCancel={() => {}}
            title={`Delete ${props.name} Unit Type?`}
        >
            <Button key={props.id} type="text" icon={<DeleteOutlined />} size="small" shape="circle" />
        </Popconfirm>
    );
}

export default DeleteUnit;
