"use client";

/**
 * * - USER INFO CARD
 */

import { Card } from "antd";
import { memo } from "react";

//props
interface UserInforCardProps {
    selected: {
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
