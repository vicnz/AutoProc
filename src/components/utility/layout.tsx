'use client';

import { Tabs } from "antd";
import { CSSProperties, PropsWithChildren } from "react";

import Header from '@components/utility/header'
import tabs from '@components/utility/tabs'
const WrapperStyle: CSSProperties = {
    width: '100vw',
    display: 'flex',
    justifyContent: 'center'
}


const UtilityLayout = function (props: PropsWithChildren<any>) {
    return (
        <>
            <div style={WrapperStyle}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateRows: "50px 1fr",
                        height: "100vh",
                        width: '100%'
                    }}
                >
                    <Header />
                    <Tabs
                        size="middle"
                        destroyInactiveTabPane
                        defaultActiveKey="tracking"
                        style={{ height: "100%", width: "100%" }}
                        items={tabs}
                        tabPosition="bottom"
                        centered
                    />
                </div>
            </div>
        </>
    )
}

export default UtilityLayout;