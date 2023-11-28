"use client";

import { Card, List, Statistic, Flex } from "antd";
import DeleteUnit from "./delete";

function UnitsList(props: { data: Array<{ id: string; name: string }> }) {
    const { data } = props;
    return (
        <div style={{ padding: 10 }}>
            <List
                grid={{ column: 3, gutter: 15 }}
                dataSource={data as any}
                renderItem={(item: any) => (
                    <List.Item key={item.id}>
                        <Card size="small">
                            <Flex justify="space-between" align="center">
                                <Statistic title={item.name} value={`1 ${item.id}`} />
                                <DeleteUnit id={item.id} name={item.name} />
                            </Flex>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default UnitsList;
