import { Card, Empty, List } from "antd";
import { userPurchases } from "./preload";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import RenderParticularList from "./components/render-list";

async function Page(props: { params: { id: string } }) {
    const { id } = props.params;
    const prs = await userPurchases(id);

    if (typeof prs.data === "undefined" || prs.error) notFound();

    return (
        <div style={{ padding: 15 }}>
            <Card title="Purchase Requests">
                {prs.data.length < 1 ? (
                    <Empty />
                ) : (
                    <List>
                        {prs.data.map((item: any) => {
                            return (
                                <Fragment key={item.id}>
                                    <RenderParticularList item={item} />
                                </Fragment>
                            );
                        })}
                    </List>
                )}
            </Card>
        </div>
    );
}

export default Page;
