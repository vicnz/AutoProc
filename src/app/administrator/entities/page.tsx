import { fetchOffices } from "./preload";
import RenderTable from "./components/render-table";
import { BlockOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";
import AddOffice from "./components/add";
import ViewScroll from "@components/scrollview";

async function Departments() {
    const data = await fetchOffices();
    if (data.error) throw new Error();
    return (
        <Card
            title={
                <span>
                    <BlockOutlined /> Offices
                </span>
            }
            style={{ height: 600 }}
            bodyStyle={{ padding: 0, margin: 0 }}
            extra={
                <Space>
                    <AddOffice departmentList={data.data as any} />
                </Space>
            }
        >
            <ViewScroll height={"calc(600px - 56px)"}>
                <RenderTable data={data.data as any} />
            </ViewScroll>
        </Card>
    );
}

export default Departments;
