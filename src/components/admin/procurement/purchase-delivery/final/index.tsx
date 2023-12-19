"use client";

/**
 * * MAKE DELIVERY FINAL
 * * MAKE SURE ALL DELIVERIES ARE FINAL
 */

import { CheckOutlined, LockOutlined } from "@ant-design/icons";
import { App, Button, Modal, Progress, theme } from "antd";
import { memo, useState } from "react";

//
const MakeDeliveryFinal = function (props: { final: boolean; id: string; progress: number }) {
    const [loading, setLoading] = useState(false); //loading state
    const [show, setShow] = useState(false); //show modal state
    const { token } = theme.useToken(); //theme token
    const { message } = App.useApp(); //app token

    //* SET DOCUMENT FINAL
    const setFinal = async () => {
        setLoading(true); //start loading
        const request = await fetch(
            `/administrator/api/procurement/delivery?_id=${encodeURIComponent(props.id)}&final=true`,
            {
                method: "PATCH",
                body: JSON.stringify({ final: true }),
            }
        );

        if (request.ok) {
            message.success(
                <>
                    <CheckOutlined /> Delivery Is Completed!
                </>
            );
            setLoading(false); //remove loading
            setShow(false); //destroy dialog
        } else {
            const responseError = await request.text();
            message.error(`An Error Occured: [${responseError}]`);
            setLoading(false); //set loading false
        }
    };

    return (
        <>
            {/* Toggle Modal Confirmation */}
            <Button
                icon={props.final === true ? <CheckOutlined /> : <LockOutlined />}
                type="default"
                onClick={() => setShow(true)}
            >
                {props.final === true ? `Delivery Completed` : `Mark As Delivered`}
            </Button>
            {/* Modal Container */}
            <Modal
                open={show}
                onCancel={() => setShow(false)}
                centered
                closeIcon={null}
                title={
                    <span>
                        <LockOutlined /> Delivery Completion&nbsp;
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
                Completed Deliveries, once all delivered items are satified the completion of purchase lifecycle
                completes.
                <br />
                <br />
                Current Delivery Percentage
                <Progress percent={props.progress} type="line" strokeColor={token.colorPrimary} showInfo />
            </Modal>
        </>
    );
};

export default memo(MakeDeliveryFinal);
