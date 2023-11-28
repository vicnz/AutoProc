import { fetchUnits } from "@state/entities/preload";
import RenderList from "./components/render-list";
import { Card } from "antd";
import { BranchesOutlined, PlusCircleOutlined } from "@ant-design/icons";
import AddNewUnit from "./components/add";
import ViewScroll from "@components/scrollview";

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
            <ViewScroll height={"calc(400px - 56px)"}>
                <div style={{ padding: 10 }}>
                    <RenderList data={data} />
                </div>
            </ViewScroll>
        </Card>
    );
}

export default Units;
