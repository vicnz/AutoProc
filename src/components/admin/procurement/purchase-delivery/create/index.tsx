"use client";

import { usePRId } from "@/components/admin/PRId";
import NetworkError from "@/components/admin/network-error";
import { Skeleton, Spin } from "antd";
import dynamic from "next/dynamic";
import useSWR from "swr";
const DeliveryForm = dynamic(async () => await import('./form'), { loading: () => <Spin spinning /> })

const CreateNewDelivery = function () {
    const useId = usePRId()
    const { data, isLoading, error } = useSWR(`/administrator/api/po?_id=${useId}`)

    if (error) {
        return (
            <>
                <NetworkError />
            </>
        )
    }

    if (isLoading || !data) {
        return (
            <>
                <Skeleton active />
            </>
        )
    }

    return (
        <div
            style={{
                height: "calc(100vh - 122px)",
                width: "100%",
                display: "grid",
                placeItems: "center",
            }}
        >
            <DeliveryForm data={data} />
        </div>
    );
};

export default CreateNewDelivery;

