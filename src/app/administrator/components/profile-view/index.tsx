"use client";

import AvatarBoring from "boring-avatars";
import { PropsWithChildren, memo, useEffect, useState } from "react";
import { Avatar, Button, Drawer, Skeleton, Space, Tag, theme } from "antd";
import { LogoutOutlined, SettingOutlined, TagOutlined, WarningOutlined } from "@ant-design/icons";
import useSWR from "swr";
import Link from "next/link";
import LoadingButton from "@components/loading-btn";

function AdminPreview(props: PropsWithChildren<any>) {
    const { token } = theme.useToken();
    const { data, error, isLoading } = useSWR("/administrator/components/profile-view/api");
    const [open, setOpen] = useState(false);

    const onKeyPress = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === `;`) {
            setOpen(true);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", onKeyPress);
        return () => window.removeEventListener("keydown", onKeyPress);
    }, []);

    if (error) {
        return <Avatar icon={<WarningOutlined />} />;
    }

    if (!data || isLoading) {
        return <Skeleton.Avatar active />;
    }

    const { data: profile } = data;

    return (
        <>
            <div onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
                <AvatarBoring variant="beam" name={profile.name} size={30} />
            </div>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                title={<span>{profile.username}</span>}
                width={400}
                styles={{
                    body: { padding: 0, position: "relative" },
                }}
            >
                <div
                    style={{
                        height: 150,
                        width: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        background:
                            "radial-gradient(circle, transparent 25%, #FFFFFF  26%),linear-gradient(0deg, transparent 44%, #38424F 45%, #38424F 55%, transparent 56%), linear-gradient(90deg, transparent 44%, #38424F 45%, #38424F 55%, transparent 56%)",
                        backgroundSize: "2em 2em",
                        backgroundColor: "white",
                        opacity: 0.2,
                    }}
                ></div>
                <Space
                    align="center"
                    style={{
                        width: "100%",
                        position: "absolute",
                        top: 100,
                        left: 0,
                    }}
                    direction="vertical"
                >
                    <AvatarBoring size={100} name={profile.name} variant="beam" />
                    <Tag style={{ fontSize: "1.1em" }} icon={<TagOutlined />}>
                        {profile.username}
                    </Tag>
                    <span style={{ fontSize: "1.5em" }}>{profile.name.toUpperCase()}</span>
                    <span style={{ fontSize: "1.1em", color: token.colorTextDescription }}>{profile.email}</span>
                    <Space style={{ width: "100%" }}>
                        <Link href="/administrator/settings" passHref>
                            <Button icon={<SettingOutlined />} />
                        </Link>
                        <Link href={`/auth/signout`} passHref>
                            <LoadingButton icon={<LogoutOutlined />} block danger type="primary">
                                Sign Out
                            </LoadingButton>
                        </Link>
                    </Space>
                </Space>
            </Drawer>
        </>
    );
}

export default memo(AdminPreview);
