'use client';

import { BuildOutlined } from '@ant-design/icons'
import { App, Button, FormInstance, Input, InputProps, InputRef } from 'antd'
import React, { ForwardedRef, RefObject, forwardRef, useState } from 'react'
import { generatePRNumber } from './server'

const PRNumberWithGenerator = forwardRef(function PRNumberCreator(
    props: InputProps & { instance: RefObject<FormInstance> },
    ref: ForwardedRef<InputRef>
) {
    const { message } = App.useApp()
    const [loading, setLoading] = useState(false)

    const handler = async () => {
        setLoading(true);
        const response = await generatePRNumber()
        if (response.error) {
            setLoading(false);
            message.error("Error, Occured Please Try Again...")
        } else {
            setLoading(false);
            props.instance.current?.setFieldValue(
                "number",
                response.number // generate value
            );
            message.info("Generated a PR Number")
        }
    }
    return (
        <>
            <Input
                {...props}
                ref={ref}
                readOnly
                style={{ ...props.style, padding: 5 }}
                suffix={
                    <Button loading={loading} icon={<BuildOutlined />} type="primary" onClick={handler} tabIndex={-1}>
                        Generate
                    </Button>
                }
            />
        </>
    )
})

export default PRNumberWithGenerator;