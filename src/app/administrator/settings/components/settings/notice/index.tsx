import { Space, InputNumber, App } from "antd";
import React, { useState } from "react";
import { update } from "./action";

const MIN = 3;
const MAX = 30;
function NoticeSettings(props: { default: { id: string; name: string; value: number; description: string | null } }) {
    const [value, setValue] = useState(Number(props.default.value));
    const { message } = App.useApp();

    const onSave = async () => {
        if (Number(props.default.value) !== value && value >= MIN && value <= MAX) {
            const request = await update(
                JSON.stringify({ value: value, name: props.default.name, id: props.default.id })
            );
            if (request?.error) {
                message.open({ type: "error", content: "Failed To Update Settings" });
            } else {
                message.open({ type: "success", content: "Updated Changing" });
            }
        }
    };

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <InputNumber
                addonBefore="Days"
                value={value}
                style={{ width: "inherit" }}
                onChange={(e) => setValue(e as number)}
                onBlur={onSave}
                max={MAX}
                min={MIN}
            />
        </Space>
    );
}

export default NoticeSettings;
