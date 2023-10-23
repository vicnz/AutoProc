'use client';

import { Fragment, PropsWithChildren, memo, useEffect } from "react";
import { App } from 'antd'

/**
 * * WRAPPER THAT STARTS UP THE NOTIFICATION HANDLER
 * * THIS WILL KICK UP THE NOTIFICATION STREAM 
 */

//* EVENT SOURCE THIS WILL START THE STREAMING
const source = new EventSource(`/administrator/api/notify`)

const Notify = function (props: PropsWithChildren<any>) {
    const { notification } = App.useApp()

    useEffect(() => {
        console.log("LISTENING.... to INCOMING Push Notifications")

        source.onmessage = (e: any) => {
            const sse = JSON.parse(e.data)
            if (sse.type === 'notif') {
                //todo create notification
                console.log("New Notification")
            }
        }
    }, []); //run once

    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}

export default memo(Notify);