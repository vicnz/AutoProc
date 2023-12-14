"use client";

import { Fragment, memo } from "react";
import Notifications from "./notif-item";
import { Empty, Result, Skeleton } from "antd";
import useSWR from "swr";

function MonthView(props: { close: any }) {
    const { data, isLoading, error, isValidating } = useSWR(
        `/administrator/components/notifications/api?type=month&days=${30}`
    );

    if (error) {
        return <Result status="error" title="Failed To Load Data Retry" />;
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

export default MonthView;
