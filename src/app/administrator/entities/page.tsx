import { fetchDepartmentsWithSection } from "@state/entities/preload";
import RenderTable from "./components/render-table";
import { BlockOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";
import ScrollView from "./components/scroll-view";
import AddOffice from "./components/add";
//
async function Departments() {
    const data = await fetchDepartmentsWithSection();
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
                    <AddOffice departmentList={data as any} />
                </Space>
            }
        >
            <ScrollView height={600 - 75}>
                <RenderTable data={data as any} />
            </ScrollView>
        </Card>
    );
}

export default Departments;
