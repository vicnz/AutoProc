import { EditOutlined, EyeOutlined } from "@ant-design/icons"
import { Segmented } from "antd"
import { SegmentedValue } from "antd/es/segmented"
import { useManager, ActionType } from "./manager"

const ToggleView = function () {
    const [state, dispatch] = useManager()
    const onChange = (e: SegmentedValue) => {
        e.toString().startsWith('Preview') ? dispatch({ type: ActionType.PREVIEW }) : dispatch({ type: ActionType.PREVIEW })
    }

    return (
        <Segmented options={[
            {
                label: 'Edit',
                value: 'Edit',
                icon: <EditOutlined />,
            },
            {
                label: 'Preview',
                value: 'Preview',
                icon: <EyeOutlined />,
            },
        ]}
            onChange={onChange}
        />
    )
}

export default ToggleView;