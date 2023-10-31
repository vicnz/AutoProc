"use client";

/**
 * * REQUEST FOR DELIVERY DATE EXTENSION
 * * THE DEADLINE WILL BE EXTENDED UPON UPDATE
 */

/**
 * TODO require the update to request for the admin password
 */

import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { App, Button, Descriptions, Divider, Form, Modal, Select, theme } from "antd";
import dayjs from "dayjs";
import { PropsWithChildren, memo, useState } from "react";

//? TYPE : EXTENDEDDELIVERYPROPS TYPE
type ExtendDeliveryProps = {
    id: string;
    endDate: string;
    startDate: string;
    deliveryStatus: string;
    number: string;
    final: boolean;
};

// ? COMPONENT : EXTENDED DELIVERY
const ExtendDelivery = function (props: PropsWithChildren<ExtendDeliveryProps>) {
    const { message } = App.useApp();
    const [form] = Form.useForm();
    const { token } = theme.useToken();
    //STATES
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const datePicker = Form.useWatch("extended_days", form);

    const onClose = () => {
        //DO CLEAN UP HERE
        setOpen(false);
    };

    const onFinish = async () => {
        //SUBMIT NEW REQUEST FOR EXTENSION
        setLoading(true);

        /**
         * * PROPS FORMAT
         * * {
         * *    extension: number, (Days of Extended Delivery)
         * *    id: string, (Delivery Schema Id)
         * *    endDate: string (ISO Format)
         * * }
         */
        const values = { extension: form.getFieldValue("extended_days"), id: props.id, endDate: props.endDate };
        const response = await fetch(
            `/administrator/api/procurement/delivery?_id=${encodeURIComponent(props.id)}&extend=true`,
            {
                method: "PATCH",
                body: JSON.stringify(values),
            }
        );

        if (response.ok) {
            setLoading(false);
            message.info(`Extended Delivery Date for PO Number: ${props.number}`);
            setOpen(false);
        } else {
            setLoading(false);
            message.error("An Error Occured Please Try Again");
        }
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} icon={<CalendarOutlined />} disabled={props.final}>
                Extend Date
            </Button>

            <Form form={form} initialValues={{ extended_days: 5 }}>
                <Modal
                    open={open}
                    onCancel={() => onClose()}
                    title="Request For Extension"
                    footer={[
                        <Button onClick={onClose}>Cancel</Button>,
                        <Button type="primary" onClick={onFinish} loading={loading}>
                            Extend
                        </Button>,
                    ]}
                >
                    {/* DISPLAY CURRENT DEADLINE AND NEW DEADLINE */}
                    <br />
                    <Descriptions bordered column={2} layout="vertical">
                        <Descriptions.Item label="Original Deadline" span={1}>
                            {dayjs(props.endDate).format("MMMM DD, YYYY")}
                        </Descriptions.Item>
                        <Descriptions.Item label="Extended Date" span={1}>
                            {dayjs(props.endDate).add(datePicker, "days").format("MMMM DD, YYYY")}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />
                    <Form.Item name="extended_days" rules={[{ required: true, message: "Required Field" }]}>
                        <Select
                            options={[
                                { label: "5 Days", value: `5` },
                                { label: "15 Days", value: `15` },
                                { label: "30 Days", value: `30` },
                                { label: "60 Days", value: `60` },
                                { label: "90 Day", value: `90` },
                            ]}
                        />
                    </Form.Item>
                </Modal>
            </Form>
        </>
    );
};

export default memo(ExtendDelivery);
