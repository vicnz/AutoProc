import Content from "@components/content";
import { PropsWithChildren } from "react";
import Header from "./components/header";

function SettingsLayout(props: PropsWithChildren<any>) {
    return <Content header={<Header />}>{props.children}</Content>;
}

export default SettingsLayout;
