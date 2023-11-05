import { Result, Skeleton } from "antd";
//libs
import { PropsWithChildren, memo } from "react";
import useSWR from "swr";
import { useUserID } from "@components/admin/layouts/user-item/context-id";
import dynamic from "next/dynamic";

const UserDetails = dynamic(async () => await import("./details"), { loading: () => <Skeleton active /> });
const UserPRs = dynamic(async () => await import("./procurements"), { loading: () => <Skeleton active /> });
//
const ProcurementItem = function (props: PropsWithChildren<any>) {
    const userId = useUserID();
    const { data, isLoading, error } = useSWR(`/administrator/api/user/${userId}`);
    if (error) {
        return <Result status={"error"} title="Network Error" subTitle="Please Refresh the Page or Try Again" />;
    }

    if (!data || isLoading) {
        return <Skeleton active />;
    }

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "30% 1fr",
                height: "calc(100vh - 112px)",
                width: "calc(100vw - 56px)",
            }}
        >
            <UserDetails data={data} />
            <UserPRs />
        </div>
    );
};

export default memo(ProcurementItem);
