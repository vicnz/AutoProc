"use client";

import { PropsWithChildren, useEffect } from "react";
//components
import ContentWrapper from "@components/admin/content";
import GlobalHeader from "@components/admin/header";
import { Chart as ChartJs, registerables } from "chart.js";
import { Button, Divider } from "antd";
import { BuildOutlined, MoreOutlined } from "@ant-design/icons";
//configs

//Server Data

//
const DashboardLayout = function (props: PropsWithChildren<any>) {
    useEffect(() => {
        ChartJs.register(...registerables);
    }, []);

    return (
        <ContentWrapper
            header={
                <GlobalHeader title={<div style={{ textTransform: "uppercase" }}>DASHBOARD</div>}>
                    <Button
                        icon={<BuildOutlined />}
                        type="text"
                        onClick={() => {
                            alert("TODO Generate Report");
                        }}
                    />
                    <Divider type="vertical" />
                    <Button icon={<MoreOutlined />} type="text" />
                </GlobalHeader>
            }
        >
            {props.children}
        </ContentWrapper>
    );
};

export default DashboardLayout;
