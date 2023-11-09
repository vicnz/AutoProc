import { Skeleton, Carousel, Card, List } from "antd";
import React, { Fragment } from "react";
import { fetchUnits } from "@state/entities/preload";
import RenderList from "./components/render-list";

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
        <div style={{ padding: 10 }}>
            <RenderList data={data} />
        </div>
    );
}

export default Units;
