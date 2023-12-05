"use client";

import { Alert, Steps, theme, Button, App, Input } from "antd";
import { useMemo, useState } from "react";
import { verifyAnswer, genAccessKey } from "./action";
import { QuestionOutlined } from "@ant-design/icons";
import { objectToForm } from "@lib/converters/formData";
import { useRouter } from "next/navigation";

function ForgotPassword(props: { answers: { q1: string; q2: string; q3: string }; userId: string; id: string }) {
    const { token } = theme.useToken();
    const { message } = App.useApp();
    const [current, setCurrent] = useState(0);
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const { replace } = useRouter();

    const steps = useMemo(() => {
        return [
            {
                key: "q1",
                title: "Q1",
                content: props.answers.q1,
            },
            {
                key: "q2",
                title: "Q2",
                content: props.answers.q2,
            },
            {
                key: "q3",
                title: "Q3",
                content: props.answers.q3,
            },
        ];
    }, [props.answers]);

    const next = async () => {
        setLoading(true);
        const data = objectToForm({
            id: props.id,
            key: steps[current].key,
            answer,
        });

        const verify = await verifyAnswer(data);
        if (!verify.error) {
            if (current < steps.length - 1) {
                setLoading(false);
                setCurrent(current + 1);
                setAnswer("");
            } else {
                const token = await genAccessKey(objectToForm({ id: props.id, userid: props.userId }));
                if (token.error) {
                    setLoading(false);
                    message.error("Server Error");
                } else {
                    setLoading(false);
                    replace(`/auth/forgot-password/update-password?token=${encodeURIComponent(token.token as string)}`);
                }
            }
        } else {
            setLoading(false);
            message.error("Invalid Answer");
            setAnswer("");
        }
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {
        lineHeight: "75px",
        textAlign: "center",
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <>
            <br />
            <Alert
                type="warning"
                description="This feature is highly under security testing to prevent unwanted behaviors."
            />
            <br />
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <br />
            <Input
                size="large"
                placeholder="Answer"
                suffix={<QuestionOutlined />}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <div style={{ marginTop: 24, textAlign: "right" }}>
                {current < steps.length && (
                    <Button type="primary" onClick={() => next()} loading={loading} block size="large">
                        Next
                    </Button>
                )}
            </div>
        </>
    );
}

export default ForgotPassword;
