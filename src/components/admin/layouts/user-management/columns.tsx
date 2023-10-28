import { BlockOutlined, CheckSquareOutlined, CodeOutlined, EyeOutlined, MailOutlined, SettingOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, TableColumnsType, Tag, Anchor, Button } from "antd";
import toBase64 from '@lib/client/blob2base64'

const UserManagementColumns: TableColumnsType = [
    {
        title: <><SmileOutlined /></>,
        dataIndex: "profile",
        key: "profile",
        width: 50,
        render: (e: Blob) => {
            if (e) {
                const imageUrl = toBase64(e)
                return (
                    <Avatar src={`data:image/png;base64,${imageUrl}`} />
                )
            } else {
                return (
                    <Avatar icon={<UserOutlined />} />
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
                    <a href={`mailto:${e}`}>{e}</a>
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
        key: 'department'
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