"use client";

import { Fragment, PropsWithChildren, memo, useCallback, useEffect } from "react";
import { App } from "antd";

const source = new EventSource(`/administrator/components/notif-popup/api`);

const Notify = function (props: PropsWithChildren<any>) {
    const { notification } = App.useApp();

    const showNotification = useCallback(
        (notifications: any[]) => {
            notifications.forEach(({ title, description }) => {
                notification.info({ message: title, description: description, duration: 5 });
            });
        },
        [notification]
    );

    useEffect(() => {
        console.log(`Listening to Push-Notifications`);
        source.onmessage = (e: any) => {
            const sse = JSON.parse(e.data);
            if (sse.type === "notif") {
                const items = JSON.parse(sse.message);
                showNotification(items);
            }
        };
        return () => {
            notification.destroy();
        };
    }, [notification, showNotification]); //run once

    return <Fragment>{props.children}</Fragment>;
};

export default Notify;
