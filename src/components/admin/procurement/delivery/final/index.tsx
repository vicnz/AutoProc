'use client'

import { CheckOutlined, LikeOutlined, LockOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { memo } from "react";

const MakeFinal = function () {
    return (
        <>
            <Button icon={<CheckOutlined />} type='primary'>Delivered</Button>
        </>
    )
}

export default memo(MakeFinal);