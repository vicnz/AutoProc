import { Card, Result, Skeleton } from "antd";
import React from "react";
import ScrollView from "../components/scroll-view";
import { TeamOutlined } from "@ant-design/icons";

function Officers() {
    return (
        <Card
            title={
                <span>
                    <TeamOutlined /> BAC Organization
                </span>
            }
            style={{ height: 400 }}
            bodyStyle={{ padding: 0, margin: 0, height: "100%" }}
        >
            <ScrollView height={400 - 75}>
                <div style={{ padding: 10 }}>
                    <Result
                        title="Work In Progress"
                        status="info"
                        subTitle="Officer Management, Still A Work In Progress Feature"
                    />
                </div>
            </ScrollView>
        </Card>
    );
}

export default Officers;
