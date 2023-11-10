"use client";

import { DeleteOutlined } from "@ant-design/icons";
import { Card, List, Statistic, Button } from "antd";

function UnitsList(props: { data: Array<{ id: string; name: string }> }) {
    const { data } = props;
    return (
        <div style={{ padding: 10 }}>
            <List
                grid={{ column: 4, gutter: 15 }}
                dataSource={data as any}
                renderItem={(item: any) => (
                    <List.Item>
                        <Card
                            size="small"
                            actions={[
                                <Button
                                    key={item.id}
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    size="large"
                                    shape="circle"
                                />,
                            ]}
                        >
                            <Statistic title={item.name} value={`1 ${item.id}`} />
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default UnitsList;
