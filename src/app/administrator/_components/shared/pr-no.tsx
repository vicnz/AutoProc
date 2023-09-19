import { BuildOutlined } from "@ant-design/icons";
import { Button, Input, InputProps, Space, Tooltip } from "antd";
import { ForwardedRef, forwardRef } from "react";


const PRNumberWithGenerator = forwardRef((props: InputProps, ref: ForwardedRef<any>) => {
    return (
        <Space.Compact style={{ width: '100%' }}>
            <Input ref={ref} {...props} />
            <Tooltip title="TODO">
                <Button icon={<BuildOutlined />} type='primary' />
            </Tooltip>
        </Space.Compact>
    )
})

export default PRNumberWithGenerator;