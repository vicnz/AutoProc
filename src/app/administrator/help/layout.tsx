import Content from "@components/content";
import React, { PropsWithChildren } from "react";
import Header from "./components/header";

function HelpLayout(props: PropsWithChildren<any>) {
    return <Content header={<Header />}>{props.children}</Content>;
}

export default HelpLayout;
