"use client";

import { App, Button, Form, Input, Select, Tag } from "antd";
import { useConfirm } from "@components/password-confirm";
import { useMemo } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { objectToForm } from "@lib/converters/formData";
import { updateSecQuestions } from "./action";

function SecurityQuestions(props: { userid: string; questions: any[]; answers: any }) {
    const [form] = Form.useForm();
    const { message } = App.useApp();

    const callback = async (e: boolean) => {
        if (e === true) {
            const data = JSON.stringify({ ...form.getFieldsValue(), userid: props.userid, id: props.answers.id });
            const response = await updateSecQuestions(data);
            if (response.error) {
                message.error("Server Error, Please Try Again");
            } else {
                message.info("Update Security Questions");
            }
        }
    };
    //
    const onFinish = async () => {
        trigger();
    };

    const options = useMemo(() => {
        return props.questions.map((item) => ({ label: item.name, value: item.name }));
    }, [props.questions]);

    const { Component, trigger } = useConfirm(props.userid, "/administrator/api/utils/confirm-password", callback); //USE CONFIRM
    return (
        <>
            {Component}
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 10 }}>
                <strong>
                    Security Questions <Tag color="orange">BETA</Tag>
                </strong>
                <Form
                    requiredMark={false}
                    form={form}
                    layout="vertical"
                    initialValues={{
                        questions: { ...props.answers.answers },
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name={["questions", "q1", "question"]}
                        label={
                            <>
                                <QuestionCircleOutlined />
                                &nbsp;Question 1
                            </>
                        }
                        style={{ marginBottom: 10 }}
                        rules={[{ required: true }]}
                    >
                        <Select options={options} />
                    </Form.Item>
                    <Form.Item name={["questions", "q1", "answer"]} rules={[{ required: true }]}>
                        <Input.Password onInput={(e: any) => (e.target.value = e.target.value.toLowerCase())} />
                    </Form.Item>
                    <Form.Item
                        name={["questions", "q2", "question"]}
                        label={
                            <>
                                <QuestionCircleOutlined />
                                &nbsp;Question 2
                            </>
                        }
                        style={{ marginBottom: 10 }}
                        rules={[{ required: true }]}
                    >
                        <Select options={options} />
                    </Form.Item>
                    <Form.Item name={["questions", "q2", "answer"]} rules={[{ required: true }]}>
                        <Input.Password onInput={(e: any) => (e.target.value = e.target.value.toLowerCase())} />
                    </Form.Item>
                    <Form.Item
                        name={["questions", "q3", "question"]}
                        label={
                            <>
                                <QuestionCircleOutlined />
                                &nbsp;Question 3
                            </>
                        }
                        style={{ marginBottom: 10 }}
                        rules={[{ required: true }]}
                    >
                        <Select options={options} />
                    </Form.Item>
                    <Form.Item name={["questions", "q3", "answer"]} rules={[{ required: true }]}>
                        <Input.Password onInput={(e: any) => (e.target.value = e.target.value.toLowerCase())} />
                    </Form.Item>

                    <Button block type="dashed" htmlType="submit" danger>
                        Apply
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default SecurityQuestions;
