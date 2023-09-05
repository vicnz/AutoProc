import { CheckOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Divider, Popover, Switch, Tag } from "antd"
import ToggleView from "./toggleview";
import { memo } from 'react'
import { useManager } from "./manager";

const PurchaseRequestHeader = function () {
    const [state, dispatch] = useManager()

    const onSave = () => {
        console.log(state)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', paddingRight: '25px', }}>
            <div>PURCHASE REQUEST <Divider type='vertical' /> <Tag color="success">Approved</Tag></div>
            <ToggleView />
            <Popover title={"APPROVED"} content={<div>Mark the Document as Final</div>} placement="bottomRight">
                <Button icon={<SaveOutlined />} type="primary" onClick={onSave}>Save</Button>
            </Popover>
        </div>
    )
}

export default memo(PurchaseRequestHeader);