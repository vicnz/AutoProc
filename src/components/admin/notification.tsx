import { BellOutlined } from "@ant-design/icons"
import { Badge, Button, Tooltip } from "antd"

const Notifications = () => {
    return (
        <Tooltip title="Notifications" placement="bottomLeft">
            <Badge dot>
                <Button icon={<BellOutlined />} type='text' />
            </Badge>
        </Tooltip>
    )
}

export default Notifications;