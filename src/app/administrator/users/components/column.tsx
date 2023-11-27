"use client";

import {
    BlockOutlined,
    CheckSquareOutlined,
    EyeOutlined,
    MailOutlined,
    PhoneOutlined,
    SecurityScanOutlined,
    SettingOutlined,
    ShareAltOutlined,
    SmileOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Avatar, TableColumnsType, Button } from "antd";
import BoringAvatar from "boring-avatars";
import OpenLink from "@components/shared/open-link";
import LoadingButton from "@components/loading-btn";
import Link from "next/link";

const UserManagementColumns: TableColumnsType = [
    {
        title: (
            <>
                <SmileOutlined />
            </>
        ),
        dataIndex: "",
        key: "profile",
        width: 75,
        render: (e) => {
            if (e.profile) {
                return <Avatar src={`data:image/png;base64,${e.profile}`} />;
            } else {
                return <BoringAvatar name={e.fullname} size={30} variant="beam" />;
            }
        },
    },
    {
        title: (
            <span>
                <UserOutlined /> Name
            </span>
        ),
        dataIndex: "fullname",
        key: "fullname",
        width: 300,
    },
    {
        title: (
            <span>
                <SecurityScanOutlined /> Role
            </span>
        ),
        dataIndex: "type",
        key: "type",
        width: 150,
        render: (e: "USER" | "TRACKER" | "CHECKER") => {
            if (e === "USER") {
                return (
                    <Button style={{ pointerEvents: "none" }} icon={<UserOutlined />}>
                        {e}
                    </Button>
                );
            }
            if (e === "TRACKER") {
                return (
                    <Button style={{ pointerEvents: "none" }} icon={<SettingOutlined />}>
                        {e}
                    </Button>
                );
            }

            if (e === "CHECKER") {
                return (
                    <Button style={{ pointerEvents: "none" }} icon={<CheckSquareOutlined />}>
                        {e}
                    </Button>
                );
            }
        },
    },
    {
        title: (
            <span>
                <BlockOutlined /> Department
            </span>
        ),
        dataIndex: "department",
        key: "department",
        ellipsis: true,
        render: (e: string) => {
            return <>{e || "_"}</>;
        },
    },
    {
        title: (
            <span>
                <BlockOutlined /> Section
            </span>
        ),
        dataIndex: "section",
        key: "section",
        ellipsis: true,
        render: (e: string) => {
            return <>{e || "_"}</>;
        },
    },
    {
        title: (
            <span>
                <MailOutlined /> Email
            </span>
        ),
        dataIndex: "email",
        key: "email",
        ellipsis: true,
        width: 175,
        render: (e: string) => {
            if (e || e !== "") {
                return (
                    <>
                        <OpenLink text={e} type="email">
                            <span title="Right Click">{e}</span>
                        </OpenLink>
                    </>
                );
            } else {
                return <span>-</span>;
            }
        },
    },
    {
        title: (
            <span>
                <PhoneOutlined /> Phone
            </span>
        ),
        dataIndex: "phone",
        key: "phone",
        render: (e: string) => {
            if (e) {
                return (
                    <>
                        <OpenLink text={e} type="phone">
                            <span title="Right Click">{e}</span>
                        </OpenLink>
                    </>
                );
            } else {
                return <span>-</span>;
            }
        },
    },
    {
        title: (
            <span>
                <ShareAltOutlined /> Link
            </span>
        ),
        ellipsis: true,
        width: 150,
        dataIndex: "link",
        key: "link",
        render: (e: string) => {
            if (e) {
                return (
                    <>
                        <OpenLink text={e} type="url">
                            <span title="Click">{e}</span>
                        </OpenLink>
                    </>
                );
            } else {
                return <span>-</span>;
            }
        },
    },
    {
        title: (
            <span>
                <EyeOutlined /> Details
            </span>
        ),
        dataIndex: "",
        key: "",
        render: (e: any) => {
            return (
                <Link href={`/administrator/users/${encodeURIComponent(e.key)}`} passHref>
                    <LoadingButton icon={<EyeOutlined />}>Details</LoadingButton>
                </Link>
            );
        },
    },
];

export default UserManagementColumns;
