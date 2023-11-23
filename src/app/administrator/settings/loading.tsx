import { Template } from "@components/content";
import { Skeleton } from "antd";

function Loading() {
    return (
        <Template>
            <Skeleton active />
        </Template>
    );
}

export default Loading;
