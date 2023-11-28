import { PaperClipOutlined } from "@ant-design/icons";
import { Card, Result } from "antd";
import ViewScroll from "@components/scrollview";

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
            <ViewScroll height={"calc(400px - 56px)"}>
                <div style={{ padding: 10, display: "grid", placeItems: "center", height: "100%" }}>
                    <Result
                        title="Conceptual Phase"
                        status="warning"
                        subTitle="Content Editor, Change and Update BAC Resolution, Awarding, Letter Of Notice and, etc. Contents"
                    />
                </div>
            </ViewScroll>
        </Card>
    );
}

export default Others;
