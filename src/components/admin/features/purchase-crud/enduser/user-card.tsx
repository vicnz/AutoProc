"use client";

/**
 * * - USER INFO CARD
 */

import { UserOutlined } from "@ant-design/icons";
import { Card, Avatar } from "antd";
import React, { memo } from "react";

//props
interface UserInforCardProps {
    selected: {
        profile: any;
        name: string;
        department: string;
        section?: string;
    };
}
//
const UserInforCard = memo(function NamedUserInfoCard(
    props: UserInforCardProps
) {
    return (
        <Card style={{ width: "100%" }}>
            <Card.Meta
                avatar={
                    props.selected.profile ? (
                        <Avatar src={props.selected?.profile} />
                    ) : (
                        <Avatar icon={<UserOutlined />} />
                    )
                }
                title={
                    <span style={{ textTransform: "uppercase" }}>
                        {props.selected?.name}
                    </span>
                }
                description={
                    <span>
                        {props.selected.department} <i>{props.selected?.section}</i>
                    </span>
                }
            />
        </Card>
    );
});

export default UserInforCard;
