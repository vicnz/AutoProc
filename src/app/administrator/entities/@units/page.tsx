import React from "react";
import { fetchUnits } from "@state/entities/preload";
import RenderList from "./components/render-list";
import ScrollView from "../components/scroll-view";
import { Button, Card, Space } from "antd";
import { BranchesOutlined, PlusCircleOutlined } from "@ant-design/icons";
import AddNewUnit from "./components/add";

const contentStyle: React.CSSProperties = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    border: "solid red 1px",
};

async function Units() {
    const data = await fetchUnits();
    return (
        <Card
            title={
                <span>
                    <BranchesOutlined /> Units
                </span>
            }
            style={{ height: 400 }}
            bodyStyle={{ padding: 0, margin: 0, height: "100%" }}
            extra={<AddNewUnit btnProps={{ icon: <PlusCircleOutlined /> }}></AddNewUnit>}
        >
            <ScrollView height={400 - 75}>
                <div style={{ padding: 10 }}>
                    <RenderList data={data} />
                </div>
            </ScrollView>
        </Card>
    );
}

export default Units;
