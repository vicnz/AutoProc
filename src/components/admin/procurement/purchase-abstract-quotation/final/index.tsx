"use client";

import { CheckOutlined, LockOutlined } from "@ant-design/icons";
import { Alert, App, Button, Modal, Tag, Typography, theme } from "antd";
import { memo, useState } from "react";

const MakeDocumentFinal = function (props: { final: boolean; id: string, rfqFinal: boolean }) {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const { token } = theme.useToken();
    const { message } = App.useApp();

    //set document final
    const setFinal = async () => {
        setLoading(true);
        const request = await fetch(
            `/administrator/api/abstract?_id=${props.id}&_final=true`,
            {
                method: "PATCH",
            }
        );
        if (request.ok) {
            message.info(
                "Abstract Document was set to FINAL, any Modification will be Limited"
            );
            setLoading(false);
            setShow(false);
        } else {
            message.error("Server Error, Please Try Again...");
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                icon={props.final === true ? <CheckOutlined /> : <LockOutlined />}
                type="text"
                onClick={() => setShow(true)}
            >
                {props.final === true ? `Completed` : `Make Final`}
            </Button>

            <Modal
                open={show}
                onCancel={() => setShow(false)}
                centered
                closeIcon={null}
                title={
                    <span>
                        <LockOutlined /> Final Document?&nbsp;
                    </span>
                }
                maskClosable={false}
                width={350}
                okButtonProps={{
                    disabled: props.final || !(props.rfqFinal),
                    loading,
                    onClick() {
                        setFinal();
                    },
                }}
            >
                <Typography.Paragraph style={{ textAlign: "justify" }}>
                    Make this Document final, allowing following to be created, Requiring Document {" "}
                    <Typography.Text strong style={{ color: token.colorPrimary }}>
                        Request for Price Quotation
                    </Typography.Text>{" "}
                    to be completed first
                </Typography.Paragraph>
                {props.rfqFinal ? null : <Tag color='red'>RFQ has not yet Completed!</Tag>}
            </Modal>
        </>
    );
};

export default memo(MakeDocumentFinal);