"use client";

import { ArrowRightOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import fullname from "@lib/client/fullname";
import { Avatar, Button, Divider, Empty, List, Skeleton, theme } from "antd";
import { memo, useEffect, useState } from "react";
import { globalSearch } from "./action";
import { useRouter } from "next/navigation";

type ResultTypes = {
    users?: any[];
    suppliers?: any[];
    records?: any[];
    empty?: boolean;
};
function RenderResult(props: { query: string; type?: string; close?: () => any }) {
    const { token } = theme.useToken();
    const { push } = useRouter();
    const [result, setResult] = useState<ResultTypes | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //fetch search object
        setLoading(true);
        globalSearch(props.query, props.type && (props.type as any)).then((res) => {
            setLoading(false);
            if (res?.empty || (res as any).error) {
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
                                style={{ cursor: "pointer" }}
                                key={item.id}
                                onClick={() => {
                                    push(`/administrator/procurements/${encodeURIComponent(item.id)}`);
                                    props.close && props.close();
                                }}
                                extra={
                                    <>
                                        <Button
                                            icon={<ArrowRightOutlined />}
                                            type="text"
                                            style={{ pointerEvents: "none" }}
                                        />
                                    </>
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
                                style={{ cursor: "pointer" }}
                                key={item.id}
                                onClick={() => {
                                    push(`/administrator/users/${encodeURIComponent(item.id)}`);
                                    props.close && props.close();
                                }}
                                extra={
                                    <>
                                        <Button
                                            icon={<ArrowRightOutlined />}
                                            type="text"
                                            style={{ pointerEvents: "none" }}
                                        />
                                    </>
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
                                style={{ cursor: "pointer" }}
                                key={item.id}
                                onClick={() => {
                                    push(`/administrator/suppliers/${encodeURIComponent(item.id)}`);
                                    props.close && props.close();
                                }}
                                extra={
                                    <>
                                        <Button
                                            icon={<ArrowRightOutlined />}
                                            type="text"
                                            style={{ pointerEvents: "none" }}
                                        />
                                    </>
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
