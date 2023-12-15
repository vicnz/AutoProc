"use client";

/**
 * * - CONTENT EDITABLE
 * * - This feature allows the editing of text body
 * * - Provide only the text that is modified
 */

import { Typography } from "antd";
import { TextProps } from "antd/es/typography/Text";
import { ForwardedRef, forwardRef, memo, PropsWithChildren, useState } from "react";

const { Text } = Typography;
///
const ContentEditable = forwardRef(function ContentEdit(
    props: PropsWithChildren<TextProps & { text: string }>,
    ref: ForwardedRef<any>
) {
    const [text, setText] = useState(props.text);
    return (
        <Text
            {...props}
            editable={{
                triggerType: ["text"],
                text,
                onChange(value) {
                    setText(value);
                },
                tooltip: "Click To Edit Text",
            }}
            ref={ref}
        >
            {text}
        </Text>
    );
});

export default memo(ContentEditable);
