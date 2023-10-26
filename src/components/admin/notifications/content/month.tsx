"use client";

import { Fragment, memo } from "react";
import Notifications from "./";
import { Empty, Result, Skeleton } from "antd";
import useSWR from "swr";

function Notif30Days(props: { close: any }) {
    const { data, isLoading, error, isValidating } = useSWR(`/administrator/api/notification?type=month&days=${30}`);

    if (error) {
        return <Result status="error" title="Failed To Load Data Retry" />;
    }
    if (!data || isLoading) {
        return <Skeleton active />;
    }

    if (data.data?.length === 0) {
        return <Empty />;
    }

    console.log("Notify30Days", data);
    return (
        <>
            {data.data.map((item: any) => {
                return (
                    <Fragment key={item.id}>
                        <Notifications data={item} close={() => props.close()} />
                    </Fragment>
                );
            })}
        </>
    );
}

export default Notif30Days;
