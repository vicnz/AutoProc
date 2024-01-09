"use client";

import { BellOutlined, DeleteOutlined, SearchOutlined, SettingOutlined, SwitcherOutlined } from "@ant-design/icons";
import { Alert, Card, InputNumber, Space, Tag } from "antd";
import React, { useMemo } from "react";
import _ from "lodash";

//options
import Pagination from "./pagination";
import SearchLimit from "./search-limit";
import Notice from "./notice";
import NotificationTrimmed from "./notification-trim";

type DataProps = {
    data?: Array<{
        name: string;
        value: string;
        description: string | null;
        id: string;
    }>;
};
function Settings(props: DataProps) {
    const val = useMemo(() => {
        const paginate = _.find(props.data, { name: "paginate" });
        const searchLimit = _.find(props.data, { name: "search_limit" });
        const notice = _.find(props.data, { name: "notice" });
        const notification = _.find(props.data, { name: "notif_clear" });
        return {
            paginate,
            searchLimit,
            notice,
            notification,
        };
    }, [props]);

    return (
        <Card
            title={
                <>
                    <SettingOutlined /> Options
                </>
            }
        >
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 10 }}>
                <Notice default={val.notice as any} />
                <div>
                    <strong>
                        <BellOutlined /> Notify Before <Tag color="red">PREVIEW</Tag>
                    </strong>
                    <hr />
                    Notify Before Nth Day. Change the days before the system notify the user of an incoming delayed
                    deliveries.
                </div>
            </div>
            <br />

            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 10 }}>
                <NotificationTrimmed default={val.notification as any} />
                <div>
                    <strong>
                        <DeleteOutlined /> Clear Notifications <Tag color="red">PREVIEW</Tag>
                    </strong>
                    <hr />
                    Number of Days before automatically remove notifications. By Default it&apos;s set to 30 Days
                </div>
            </div>
            <br />
            {/* PAGINATE OPTIONS */}
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 10 }}>
                <Pagination default={val.paginate as any} />
                <div>
                    <strong>
                        <SwitcherOutlined /> Pagination Size
                    </strong>
                    <hr />
                    Default Pagination size used by records list. By default it&apos;s set to 8.
                </div>
            </div>
            {/* PAGINATE OPTIONS */}
            <br />
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 10 }}>
                <SearchLimit default={val.searchLimit as any} />
                <div>
                    <strong>
                        <SearchOutlined /> Search Limit
                    </strong>
                    <hr />
                    Maximum Returned Result by Global Search, By Default is 10 Items Per Category.
                    <br />
                    <Alert
                        type="warning"
                        message="Performance"
                        description="To Prevent Performance Bottle-Neck Keep the Search Limit At Minimum."
                    />
                </div>
            </div>
        </Card>
    );
}

export default Settings;
