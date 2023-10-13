import {
    Steps,
    StepsProps,
    StepProps,
    Timeline, Tag
} from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";

const TimeLine = (
    <Timeline
        mode="left"
        items={[
            {
                pending: false,
                color: "green",
                children: (
                    <span>
                        <Tag>{dayjs().format("MM/DD/YY hh:mm a")}</Tag>
                        Demo Office <br />
                    </span>
                ),
                position: "left",
            },
            {
                pending: false,
                color: "green",
                children: (
                    <span>
                        <Tag>{dayjs().format("MM/DD/YY hh:mm a")}</Tag>
                        Demo Office <br />
                    </span>
                ),
                position: "left",
            },
            {
                pending: true,
                color: "blue",
                children: (
                    <span>
                        <Tag>{dayjs().format("MM/DD/YY hh:mm a")}</Tag>
                        Demo Office <br />
                    </span>
                ),
                position: "left",
            }
        ]}
    />
);
const Steppers = function (props: { data: { documents: any[] } }) {
    const StepItems: StepsProps["items"] = useMemo(() => {
        return props.data.documents.map<StepProps>(
            (item: { tracking: any[]; name: string; final: boolean }, idx) => {
                const status =
                    (props.data.documents[--idx]?.final || false) &&
                    !props.data.documents[idx++].final;
                return {
                    status: status ? "process" : item.final ? "finish" : "wait",
                    title: item.name,
                    description: (
                        <>
                            <br />
                            {TimeLine}
                        </>
                    ),
                };
            }
        );
    }, [props.data]);
    return <Steps direction="vertical" items={StepItems} />;
};

export default Steppers;
