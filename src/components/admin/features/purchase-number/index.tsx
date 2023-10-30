'use client';

/**
 * TODO - THIS FEATURE IS STILL IN DEVELOPMENT AND NOT YET INTEGRATED IN THE SYSTEM
 * TODO - Required the Generator to validate incoming generated number based from the last committed PR Number
 * TODO - For this, an implemented API enpoint that request the server for the latest committed number
 * TODO - And generate anew number incremental from the requested
 */

import { BuildOutlined } from "@ant-design/icons";
import {
    Button,
    Input,
    InputProps,
    InputRef,
    Space,
    Tooltip,
    FormInstance,
} from "antd";
import dayjs from "dayjs";
import { ForwardedRef, RefObject, forwardRef, memo, useState } from "react";
import { randomRange } from "@lib/client/random-range";

const PRNumberWithGenerator = forwardRef(function PRNumberCreator(
    props: InputProps & { instance: RefObject<FormInstance> },
    ref: ForwardedRef<InputRef>
) {
    const handler = () => {
        props.instance.current?.setFieldValue(
            "number",
            PRNumberGenerator().next().value
        );
    };
    return (
        <>
            <Space.Compact style={{ width: "100%" }}>
                <Input {...props} ref={ref} />
                <Tooltip title="Generate PR Number">
                    <Button
                        icon={<BuildOutlined />}
                        type="primary"
                        onClick={handler}
                        tabIndex={-1}
                    />
                </Tooltip>
            </Space.Compact>
        </>
    );
});

const PRNumberGenerator = function* () {
    while (true) {
        let nowDate = dayjs("2019-05-09");
        let year = nowDate.get("year");
        let month = nowDate.get("month") + 1;
        let date = nowDate.get("D");
        let autoIncrement = randomRange(10, 20);
        let id = `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date
            }${autoIncrement}`;

        yield id;
    }
};

export default memo(PRNumberWithGenerator);
