"use client";

import { Fragment, memo } from "react";
import Notifications from "./";
import { Empty, Result, Skeleton } from "antd";
import useSWR from "swr";

function NotifToday(props: { close: any }) {
    const { data, isLoading, error, isValidating } = useSWR(`/administrator/api/notification?type=today&days=${1}`);

    if (error) {
        return <Result status="error" title="Failed To Load Data Please Retry!" />;
    }
    if (!data || isLoading) {
        return <Skeleton active />;
    }
    if (data.data?.length === 0) {
        return <Empty />;
    }
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

export default NotifToday;