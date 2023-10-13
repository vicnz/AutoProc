"use client";

/**
 * * - SELECT PARTICULARS
 * * - This is the Mini-Feature that allows the creation of PR Particulars
 */

//libs
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Space, InputNumber, Input, Button } from "antd";
import { forwardRef, memo } from "react";
//SELECT UNIT TYPE
import SelectUnit from "./unit";
import { RuleObject } from "antd/es/form";
//
const SelectParticulars = forwardRef(function Particulars(props, ref) {

    //PARTICULAR VALIDATOR
    const validator = (rule: RuleObject, value: any) => {
        if (value?.length < 1) {
            return Promise.reject("Empty Particulars");
        } else {
            return Promise.resolve("Resolved");
        }
    }
    ///
    return (
        <Form.List
            name="particulars"
            rules={[
                {
                    validator,
                    message: "Add At Least One Item",
                },
            ]}
        >
            {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map((field) => {
                        return (
                            <Space key={field.key} style={{ marginBottom: 16 }}>
                                {/* QUANTITY ENTRY */}
                                <Form.Item
                                    noStyle
                                    name={[field.name, "qty"]}
                                    rules={[{ required: true }]}
                                >
                                    <InputNumber
                                        placeholder="Quantity"
                                        style={{ width: 75 }}
                                        min={1}
                                    />
                                </Form.Item>
                                {/* TYPE OF UNIT ENTRY */}
                                <Form.Item
                                    noStyle
                                    name={[field.name, "unit"]}
                                    rules={[{ required: true }]}
                                >
                                    <SelectUnit />
                                </Form.Item>
                                {/* ITEM DESCRIPTION ENTRY */}
                                <Form.Item
                                    noStyle
                                    name={[field.name, "description"]}
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        placeholder="Item Description"
                                        style={{ width: 175 }}
                                    />
                                </Form.Item>
                                {/* STOCK NUMBER */}
                                <Form.Item noStyle name={[field.name, "stock"]}>
                                    <Input placeholder="Stock Number" />
                                </Form.Item>
                                {/* UNIT PRICE */}
                                <Form.Item
                                    noStyle
                                    name={[field.name, "price"]}
                                    rules={[{ required: true }]}
                                >
                                    <InputNumber
                                        placeholder="Unit Price"
                                        addonBefore={<>&#8369;</>}
                                        style={{ width: 150 }}
                                        min={1}
                                    />
                                </Form.Item>
                                {/* REMOVE PARTICULAR ITEM */}
                                <MinusCircleOutlined
                                    onClick={() => {
                                        remove(field.name);
                                    }}
                                />
                            </Space>
                        );
                    })}


                    {/* ADD NEW PARTICULAR ITEM */}
                    <Form.Item key={"submit-btn"}>
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                        >
                            Add Item
                        </Button>
                    </Form.Item>
                    {/* RENDERED ERROR FORM.LIST */}
                    <Form.ErrorList errors={errors} />
                </>
            )}
        </Form.List>
    );
});

export default memo(SelectParticulars);