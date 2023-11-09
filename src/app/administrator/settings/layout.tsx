import Content from "@components/admin/content";
import React, { PropsWithChildren } from "react";
import Header from "./components/header";
import { Anchor, Col, Row } from "antd";

function SettingsLayout(props: PropsWithChildren<any>) {
    return (
        <Content header={<Header />}>
            <div
                style={{
                    height: "calc(100vh - 112px)",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "150px 1fr",
                }}
            >
                <div>
                    <Anchor
                        showInkInFixed
                        affix
                        style={{ height: "calc(100vh - 112px)" }}
                        items={[
                            {
                                key: "part-1",
                                href: "#account",
                                title: "Account",
                            },
                            {
                                key: "part-2",
                                href: "#theme",
                                title: "Theme",
                            },
                            {
                                key: "part-3",
                                href: "#delivery",
                                title: "Feedback",
                            },
                        ]}
                    />
                </div>
                <div style={{ height: "100%", width: "100%", position: "relative", overflowY: "auto" }}>
                    <div
                        style={{
                            height: "auto",
                            width: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            padding: "10px 25px",
                            paddingRight: 50,
                        }}
                    >
                        {props.children}
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default SettingsLayout;
