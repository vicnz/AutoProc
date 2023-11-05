"use client";
//
import { Result, Skeleton } from "antd";
import useSWR from "swr";
import Form from "@components/admin/features/users-crud/form";
import { memo } from "react";
//
const PreloadWithData = (props: { id: string; close?: () => void }) => {
    const { data, isLoading, error, mutate } = useSWR(`/administrator/api/user/${encodeURIComponent(props.id)}`);
    if (error) {
        return <Result status="error" title="Network Error" subTitle="Please Try Again" />;
    }
    if (!data || isLoading) {
        return <Skeleton active />;
    }
    return (
        <>
            <Form data={data} edit close={() => props.close && props.close()} mutate={() => mutate()} />
        </>
    );
};

export default memo(PreloadWithData);
