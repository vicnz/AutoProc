'use client'

import { Skeleton } from "antd"

const SuspenseLoading = function () {
    return (
        <div style={{ padding: '10px' }}>
            <Skeleton paragraph active />
        </div>
    )
}

export default SuspenseLoading