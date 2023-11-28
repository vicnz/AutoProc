import { Card, Result } from "antd";
import ViewScroll from "@components/scrollview";
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
            <ViewScroll height={"calc(400px - 56px)"}>
                <div style={{ padding: 10 }}>
                    <Result
                        title="Work In Progress"
                        status="info"
                        subTitle="Officer Management, Still A Work In Progress Feature"
                    />
                </div>
            </ViewScroll>
        </Card>
    );
}

export default Officers;
