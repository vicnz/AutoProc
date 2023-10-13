'use client';


import { Result, App } from "antd"
import { PropsWithChildren, memo } from "react"

const PurchaseOrderRequireFinal = function (props: PropsWithChildren<{ title: string, subTitle?: string }>) {
    return (
        <Result
            status='403'
            title={props.title}
            subTitle={props.subTitle}
            extra={
                <>
                    {props.children}
                </>
            }
        />
    )
}

export default memo(PurchaseOrderRequireFinal)