"use client";

import { Avatar, Flex } from "antd";
import BoringAvatar from "boring-avatars";

function AvatarView(props: { profile: string; name?: string }) {
    return (
        <Flex align="center" justify="center" vertical style={{ textAlign: "center", padding: "25px 25px" }}>
            {typeof props.profile === "undefined" || props.profile === null ? (
                <BoringAvatar name={props.name || "neonzone"} size={150} variant="beam" />
            ) : (
                <Avatar src={`data:image/png;base64,${props.profile}`} size={150} />
            )}
        </Flex>
    );
}

export default AvatarView;
