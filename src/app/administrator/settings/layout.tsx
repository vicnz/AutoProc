import Content from "@components/admin/content";
import { PropsWithChildren } from "react";
import Header from "./_components/header";

function SettingsLayout(props: PropsWithChildren<any>) {
    return <Content header={<Header />}>{props.children}</Content>;
}

export default SettingsLayout;
