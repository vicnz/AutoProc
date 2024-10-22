import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import Content from "@components/content";
import Header from "./components/header";

const SplitStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "30% 1fr",
    height: "100%",
};

async function PageLayout(props: PropsWithChildren<{ pr: ReactNode }>) {
    return (
        <Content header={<Header />}>
            <div style={SplitStyle}>
                {props.children}
                {props.pr}
            </div>
        </Content>
    );
}

export default PageLayout;
