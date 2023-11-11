"use client";

import { DeleteOutlined } from "@ant-design/icons";
import { deleteUnit } from "@state/entities/actions";
import { Card, List, Statistic, Button, Flex, Popconfirm } from "antd";

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
                                <Popconfirm
                                    onConfirm={async () => {
                                        await deleteUnit(item.id);
                                    }}
                                    onCancel={() => {}}
                                    title={`Delete ${item.name} Unit Type?`}
                                >
                                    <Button
                                        key={item.id}
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        size="small"
                                        shape="circle"
                                    />
                                </Popconfirm>
                            </Flex>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default UnitsList;
