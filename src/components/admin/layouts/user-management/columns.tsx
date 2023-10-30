import { BlockOutlined, CheckSquareOutlined, CodeOutlined, EyeOutlined, LinkOutlined, MailOutlined, ManOutlined, SettingOutlined, ShareAltOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, TableColumnsType, Tag, Anchor, Button } from "antd";
import toBase64 from '@lib/client/blob2base64'
import BoringAvatar from 'boring-avatars'

const UserManagementColumns: TableColumnsType = [
    {
        title: <><SmileOutlined /></>,
        dataIndex: "",
        key: "profile",
        width: 50,
        render: (e: { profile: Blob, fullname: string }) => {
            if (e.profile) {
                const imageUrl = toBase64(e.profile)
                return (
                    <Avatar src={`data:image/png;base64,${imageUrl}`} />
                )
            } else {
                return (
                    <BoringAvatar name={e.fullname} size={30} variant="beam" />
                )
            }
        }
    },
    {
        title: (
            <span>
                <UserOutlined /> Name
            </span>
        ),
        dataIndex: 'fullname',
        key: 'fullname',
        width: 300
    },
    {
        title: (
            <span>
                <CodeOutlined /> Username
            </span>
        ),
        dataIndex: 'username',
        key: 'username',
        render: (e: string) => {
            return (
                <Tag>{e}</Tag>
            )
        }
    },
    {
        title: (
            <span>
                <MailOutlined /> Email
            </span>
        ),
        dataIndex: 'email',
        key: 'email',
        render: (e: string) => {
            if (e) {
                return (
                    <a href={`mailto:${e}`}>{e} <LinkOutlined size={18} /></a>
                )
            } else {
                return e
            }
        }
    },
    {
        title: (
            <span>
                <BlockOutlined /> Department
            </span>
        ),
        dataIndex: 'department',
        key: 'department',
        render: (e: string) => {
            return (
                <>{e || "_"}</>
            )
        }
    },
    {
        title: (
            <span>
                Role
            </span>
        ),
        dataIndex: 'type',
        key: 'type',
        render: (e: 'USER' | 'TRACKER' | 'CHECKER') => {
            if (e === 'USER') {
                return (
                    <Button style={{ pointerEvents: 'none' }} icon={<UserOutlined />}>{e}</Button>
                )
            }
            if (e === 'TRACKER') {
                return (
                    <Button style={{ pointerEvents: 'none' }} icon={<SettingOutlined />}>{e}</Button>
                )
            }

            if (e === 'CHECKER') {
                return (
                    <Button style={{ pointerEvents: 'none' }} icon={<CheckSquareOutlined />}>{e}</Button>
                )

            }
        }
    },
    {
        title: (
            <span>
                <EyeOutlined /> Details
            </span>
        ),
        dataIndex: '',
        key: '',
        render: (e: any) => {
            return <Button type='text'><EyeOutlined /> Details</Button>
        }
    }
]

export default UserManagementColumns;