"use client";

import { Button, Flex, Form, Input, Select, Tag } from "antd";
import { Fragment } from "react";

//TODO store this in database
const options = [
    { label: "In what city you where born?", value: "city_born" },
    { label: "What was the name of your dog?", value: "dog_name" },
    { label: "What was your favorite food?", value: "fav_food" },
    { label: "A Special Memoriable Date?", value: "spec_date" },
];

function SecurityQuestions() {
    const [form] = Form.useForm();

    return (
        <>
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 10 }}>
                <strong>
                    Security Questions <Tag color="orangered">ALPHA</Tag>
                </strong>
                <Form
                    disabled
                    form={form}
                    initialValues={{
                        questions: [
                            { question: "", answer: "" },
                            { question: "", answer: "" },
                            { question: "", answer: "" },
                        ],
                    }}
                >
                    <Flex vertical gap={20}>
                        <Form.List name="questions">
                            {(fields) => (
                                <>
                                    {fields.map(({ key, name, ...restField }, idx) => (
                                        <Fragment key={key}>
                                            <Flex vertical gap={5}>
                                                <strong>Question {idx + 1}</strong>
                                                <Form.Item
                                                    noStyle
                                                    {...restField}
                                                    name={[name, "question"]}
                                                    rules={[{ required: true, message: "Missing Question Field" }]}
                                                >
                                                    <Select placeholder="Select Question" options={options} />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    noStyle
                                                    name={[name, "answer"]}
                                                    rules={[{ required: true, message: "Missing Answer Field" }]}
                                                >
                                                    <Input placeholder="Answer" />
                                                </Form.Item>
                                            </Flex>
                                        </Fragment>
                                    ))}
                                </>
                            )}
                        </Form.List>
                        <Button block type="dashed" htmlType="submit">
                            Apply
                        </Button>
                    </Flex>
                </Form>
            </div>
        </>
    );
}

export default SecurityQuestions;
