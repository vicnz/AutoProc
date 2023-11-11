import { PaperClipOutlined } from "@ant-design/icons";
import { Card, Result } from "antd";
import ScrollView from "../components/scroll-view";

function Others() {
    return (
        <Card
            title={
                <span>
                    <PaperClipOutlined /> Document Editor
                </span>
            }
            style={{ height: 400 }}
            bodyStyle={{ padding: 0, margin: 0, height: "100%" }}
        >
            <ScrollView height={400 - 75}>
                <div style={{ padding: 10, display: "grid", placeItems: "center", height: "100%" }}>
                    <Result
                        title="Conceptual Phase"
                        status="warning"
                        subTitle="Content Editor, Change and Update BAC Resolution, Awarding, Letter Of Notice and, etc. Contents"
                    />
                </div>
            </ScrollView>
        </Card>
    );
}

export default Others;
