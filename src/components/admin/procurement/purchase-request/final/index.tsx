"use client";

import { CheckOutlined, LockOutlined } from "@ant-design/icons";
import { Alert, App, Button, Modal, Tag, Typography, theme } from "antd";
import { memo, useState } from "react";

const MakeDocumentFinal = function (props: { final: boolean, id: string }) {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const { token } = theme.useToken();
    const { message } = App.useApp();

    //set document final
    const setFinal = async () => {
        setLoading(true);
        const request = await fetch(
            `/administrator/api/pr?_id=${props.id}&_final=true`,
            {
                method: "PATCH",
            }
        );
        if (request.ok) {
            message.info("PR was set to FINAL, any Modification will be Limited");
            setLoading(false);
            setShow(false)
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
                        <LockOutlined /> Final Document?
                    </span>
                }
                maskClosable={false}
                width={350}
                okButtonProps={{
                    disabled: props.final,
                    loading,
                    onClick() {
                        setFinal();
                    },
                }}
            >
                <Typography.Paragraph style={{ textAlign: "justify", color: 'dimgray' }}>
                    Make this Document Final, This will allow the creation of{" "}
                    <Typography.Text strong style={{ color: token.colorPrimary }}>
                        Request For Quotation
                    </Typography.Text>{" "}
                    and{" "}
                    <Typography.Text strong style={{ color: token.colorPrimary }}>
                        Abstract of Quotation
                    </Typography.Text>
                    .
                </Typography.Paragraph>
                <Alert
                    closeIcon={null}
                    banner
                    type="warning"
                    message={`Not Allowed For Changes!`}
                    description={`Once a document is marked final it can no longer be updated or modified`}
                />
                <br />
                <Typography.Paragraph>
                    It can be reverted but it is not a recommended action, It will be address later. <Typography.Text italic>This feature is part of the <Tag>Feature Roadmap</Tag></Typography.Text>
                </Typography.Paragraph>
            </Modal>
        </>
    );
};

export default memo(MakeDocumentFinal);