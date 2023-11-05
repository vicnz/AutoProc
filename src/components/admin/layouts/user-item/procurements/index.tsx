import { Fragment, memo } from "react";
import useSWR from "swr";
import { useUserID } from "../context-id";
import Layout from "./layout";
import { Card, Divider, Empty, List, Result, Skeleton } from "antd";
import { PrismaModels } from "@lib/db";
import ListItem from "./items";

type RowType = Pick<
    PrismaModels["purchase_requests"],
    "date" | "number" | "purpose" | "id" | "reference" | "particulars"
>;
function UserProcurementList() {
    const id = useUserID();

    const { data, error, isLoading } = useSWR(
        `/administrator/api/user/${encodeURIComponent(id)}?purchase_requests=true`
    );
    if (error) {
        return (
            <Layout>
                <Result status="error" title="Network Error" subTitle="Failed Loading Purchase Requests..." />
            </Layout>
        );
    }

    if (!data || isLoading) {
        return (
            <Layout>
                <Skeleton active />
            </Layout>
        );
    }
    return (
        <Layout>
            <Card title="Purchase Requests" loading={!data || isLoading}>
                {data.length < 1 ? (
                    <Empty />
                ) : (
                    <List>
                        {data.map((item: RowType) => {
                            return (
                                <Fragment key={item.id}>
                                    <ListItem data={item} />
                                </Fragment>
                            );
                        })}
                    </List>
                )}
            </Card>
        </Layout>
    );
}

export default memo(UserProcurementList);
