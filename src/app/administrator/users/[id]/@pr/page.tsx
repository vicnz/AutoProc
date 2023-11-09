import { Card, Empty, List } from "antd";
import { fetchUserPurchaseRequest } from "@state/users/preload";
import RenderListItem from "../_components/render-list";
import { Fragment } from "react";

async function Page(props: { params: { id: string } }) {
    const { id } = props.params;
    const data = await fetchUserPurchaseRequest(id);
    return (
        <Card title="Purchase Requests">
            {data.length < 1 ? (
                <Empty />
            ) : (
                <List>
                    {data.map((item: any) => {
                        return (
                            <Fragment key={item.id}>
                                <RenderListItem item={item} />
                            </Fragment>
                        );
                    })}
                </List>
            )}
        </Card>
    );
}

export default Page;
