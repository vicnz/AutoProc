"use client";

import { ArrowRightOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import fullname from "@lib/client/fullname";
import { Avatar, Button, Divider, Empty, List, Skeleton, theme } from "antd";
import React, { memo, useEffect, useMemo, useState } from "react";
import RedirectTo from "./view-button";

type ResultTypes = {
    users?: any[];
    suppliers?: any[];
    records?: any[];
    empty?: boolean;
};
function RenderResult(props: { query: string; type?: string; close?: () => any }) {
    const { token } = theme.useToken();
    const [result, setResult] = useState<ResultTypes | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        //fetch search object
        setLoading(true);
        fetch(`/administrator/api/search?q=${props.query}${props.type && `&type=${props.type}`}`)
            .then((res) => res.json())
            .then((res) => {
                setLoading(false);
                if (result?.empty) {
                    setResult(null);
                } else {
                    setResult({ ...res });
                }
            });
    }, [props.query, result?.empty, props.type]);

    if (loading) {
        return <Skeleton active />;
    }

    if (!result) {
        return <Empty />;
    }
    return (
        <>
            {result?.records ? (
                <>
                    <Divider>Records</Divider>
                    <List
                        dataSource={result.records}
                        renderItem={(item) => (
                            <List.Item
                                key={item.id}
                                extra={
                                    <RedirectTo
                                        href={`/administrator/procurements/${item.id}`}
                                        close={() => props.close && props.close()}
                                    />
                                }
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            icon={<ShoppingCartOutlined />}
                                            style={{ background: token.colorPrimary }}
                                        />
                                    }
                                    title={item.number}
                                    description={item.reference}
                                />
                            </List.Item>
                        )}
                    />
                </>
            ) : null}

            {result?.users ? (
                <>
                    <Divider>Users</Divider>
                    <List
                        dataSource={result.users}
                        renderItem={(item) => (
                            <List.Item
                                key={item.id}
                                extra={
                                    <RedirectTo
                                        href={`/administrator/users/${item.id}`}
                                        close={() => props.close && props.close()}
                                    />
                                }
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar icon={<UserOutlined />} style={{ background: token.colorPrimary }} />
                                    }
                                    title={fullname(
                                        { fname: item.fname, mname: item.mname, lname: item.lname, suffix: null },
                                        true
                                    )}
                                    description={item.email}
                                />
                            </List.Item>
                        )}
                    />
                </>
            ) : null}

            {result?.suppliers ? (
                <>
                    <Divider>Suppliers</Divider>
                    <List
                        dataSource={result.suppliers}
                        renderItem={(item) => (
                            <List.Item
                                key={item.id}
                                extra={
                                    <RedirectTo
                                        href={`/administrator/suppliers/${item.id}`}
                                        close={() => props.close && props.close()}
                                    />
                                }
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar icon={<ShopOutlined />} style={{ background: token.colorPrimary }} />
                                    }
                                    title={item.name}
                                    description={item.representative}
                                />
                            </List.Item>
                        )}
                    />
                </>
            ) : null}
        </>
    );
}

export default memo(RenderResult);
