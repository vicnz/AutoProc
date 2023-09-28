import { Typography } from "antd"
import { TextProps } from "antd/es/typography/Text"
import { forwardRef, memo, PropsWithChildren, useState } from "react"

const { Text } = Typography;
const ContentEditable = forwardRef((props: PropsWithChildren<TextProps & { text: string }>, ref) => {
    const [text, setText] = useState(props.text)
    return (
        <Text {...props} editable={{ triggerType: ['text'], text, onChange(value) { setText(value) }, }}>
            {text}
        </Text>
    )
})

export default memo(ContentEditable);