"use client";

/**
 * * PURCHASE NUMBER GENERATOR
 */

import { BuildOutlined } from "@ant-design/icons";
import { Button, Input, InputProps, InputRef, Space, Tooltip, FormInstance, App } from "antd";
import dayjs from "dayjs";
import { ForwardedRef, RefObject, forwardRef, memo, useState } from "react";

const PRNumberWithGenerator = forwardRef(function PRNumberCreator(
    props: InputProps & { instance: RefObject<FormInstance> },
    ref: ForwardedRef<InputRef>
) {
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);
    const handler = async () => {
        setLoading(true);
        const response = await fetch(`/administrator/api/number?date=${encodeURIComponent(dayjs().toISOString())}`);
        if (response.ok) {
            const result = await response.json();
            props.instance.current?.setFieldValue(
                "number",
                result.number // generate value
            );
            message.info("PR Number Generated");
        } else {
            message.error("An Error Occured, Please Try Again Later");
        }
        setLoading(false);
    };
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
    );
});

export default memo(PRNumberWithGenerator);
