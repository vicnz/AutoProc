"use client";
/**
 * * CREATE NEW DELIVERY
 */
import { usePRId } from "@/components/admin/pr-number";
import { CalendarOutlined, InfoCircleOutlined, NumberOutlined } from "@ant-design/icons";
import { App, Form, Card, Button, Descriptions, DatePicker } from "antd";
import dayjs from "dayjs";
import { memo } from "react";

//
const CreateDeliveryForm = function (props: { data: any }) {
    const useId = usePRId();
    const { data } = props;
    const { message, modal } = App.useApp();
    const [form] = Form.useForm();
    const dateObject = Form.useWatch("startDate", form);

    const onFinish = async (val: any) => {
        const data = {
            startDate: dayjs(form.getFieldValue("startDate")).toISOString(),
        };
        let result = modal.confirm({
            content:
                "Create A Delivery Monitoring? this will initialize the tracking of delay deliveries of the Purchase Order",
            title: "Delivery",
            centered: true,
            onCancel: () => {
                result.destroy();
            },
            onOk: async () => {
                const request = await fetch(`/administrator/api/delivery?_id=${useId}`, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (request.ok) {
                    message.success("Delivery Started");
                    result.destroy();
                } else {
                    message.error("Error Occured, Please Try Again");
                }
            },
        });
    };

    return (
        <div style={{ display: "grid", placeItems: "center" }}>
            <Form form={form} initialValues={{ startDate: dayjs() }} layout="vertical" onFinish={onFinish}>
                <Card
                    style={{ width: 400 }}
                    actions={[
                        <Button type="text" icon={<CalendarOutlined />} htmlType="submit" key={"action"}>
                            Start Monitoring
                        </Button>,
                    ]}
                    title={
                        <span>
                            <InfoCircleOutlined /> DELIVERY MONITORING
                        </span>
                    }
                >
                    <Card.Meta description="Create A Delivery Monitoring once the documents [Purchase Order] is recieved by the supplier." />
                    <br />
                    <Descriptions bordered size="small" layout="vertical" column={2}>
                        <Descriptions.Item
                            label={
                                <>
                                    <NumberOutlined /> PO Number
                                </>
                            }
                            span={2}
                        >
                            {data.number}
                        </Descriptions.Item>
                        <Descriptions.Item label="From" span={1}>
                            {dayjs(dateObject).format("MMMM DD, YYYY")}
                        </Descriptions.Item>
                        <Descriptions.Item label={`To ${data.duration} day(s)`} span={1}>
                            {dayjs(dateObject).add(data.duration, "day").format("MMMM DD, YYYY")}
                        </Descriptions.Item>
                    </Descriptions>
                    <br />
                    <Form.Item name="startDate" rules={[{ required: true, message: "Required Date" }]}>
                        <DatePicker size="large" style={{ width: "100%" }} allowClear={false} />
                    </Form.Item>
                </Card>
            </Form>
        </div>
    );
};

export default memo(CreateDeliveryForm);
