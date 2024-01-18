import { ReactNode } from "react";
import Content from "@components/content";
import { Flex } from "antd";
import Header from "./components/header";

//default page to rendere is DEPARTMENT

type LayoutProps = {
    units: ReactNode;
    officers: ReactNode;
    children: ReactNode;
    others: ReactNode;
};

function Layout(props: LayoutProps) {
    return (
        <Content header={<Header />}>
            <div style={{ padding: "10px 25px" }}>
                <Flex gap={15} justify="stretch">
                    <Flex gap={15} vertical style={{ width: "50%" }}>
                        {props.children}
                        {props.units}
                    </Flex>
                    <Flex vertical gap={15} style={{ width: "50%" }}>
                        {props.officers}
                        {props.others}
                    </Flex>
                </Flex>
            </div>
        </Content>
    );
}

export default Layout;
