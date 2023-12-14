"use client";

import { Fragment, PropsWithChildren, memo, useCallback, useEffect } from "react";
import { App } from "antd";

/**
 * * WRAPPER THAT STARTS UP THE NOTIFICATION HANDLER
 * * THIS WILL KICK UP THE NOTIFICATION STREAM
 */

const source = new EventSource(`/administrator/api/notify`);
const Notify = function (props: PropsWithChildren<any>) {
    //* EVENT SOURCE THIS WILL START THE STREAMING
    const { notification } = App.useApp();

    /**SHOW NOTIFICATION UPHEAVAL */
    const showNotification = useCallback(
        (notifications: any[]) => {
            notifications.forEach(({ title, description }) => {
                notification.info({ message: title, description: description, duration: 5 });
            });
        },
        [notification]
    );

    useEffect(() => {
        console.log("LISTENING.... to INCOMING Push Notifications");
        source.onmessage = (e: any) => {
            const sse = JSON.parse(e.data);
            if (sse.type === "notif") {
                const items = JSON.parse(sse.message);
                console.log(items);
                showNotification(items);
            }
        };
        return () => {
            notification.destroy();
        };
    }, [notification, showNotification]); //run once

    return <Fragment>{props.children}</Fragment>;
};

export default memo(Notify);
