"use client";

import { UserOutlined, SettingOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Flex, Segmented } from "antd";
import React from "react";

function UserType(props: { userType: string }) {
    return (
        <Flex justify="center" align="center">
            <Segmented
                options={[
                    { label: "User", value: "USER", icon: <UserOutlined /> },
                    { label: "Tracker", value: "TRACKER", icon: <SettingOutlined /> },
                    { label: "Checker", value: "CHECKER", icon: <CheckCircleOutlined /> },
                ]}
                value={props.userType}
                readOnly={true}
            />
        </Flex>
    );
}

export default UserType;
