"use client";
//lib
import Image from "next/image";
import { Space } from "antd";
import { CSSProperties, PropsWithChildren, memo } from "react";
//components
import bsclogo from "@media/templates/bsclogo.png";
import ambisyon from "@media/templates/ambisyon.png";
import header from '@media/templates/document-header.png'
//config

//styles
const WrapperStyle: CSSProperties = {
    display: "grid",
    placeItems: "center",
    padding: "10px 25px",
};
const HeaderItemsStyles: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "25% 1fr 25%",
    width: "100%",
};
//
const PreviewHeader = function (props: PropsWithChildren<{ height?: number }>) {
    return (
        <>
            <div style={{ ...WrapperStyle, height: props.height }}>
                <div style={{ width: "100%" }}>
                    <Space style={HeaderItemsStyles} size="large">
                        {BSCLogo}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <span style={{ fontSize: "1.8em", fontFamily: "serif", textAlign: 'center' }}>
                                Batanes State College
                            </span>
                            <span
                                style={{ color: "dimgray", fontSize: "1em", fontFamily: "serif" }}
                            >
                                Washinton Ave. San Antonio, Basco
                            </span>
                        </div>
                        {Ambisyon}
                    </Space>
                    {props.children}
                </div>
            </div>
        </>
    );
};

const BSCLogo = (
    <div style={{ width: "100%", textAlign: "right" }}>
        <Image src={bsclogo} height={75} width={75} alt="BSC-Logo" />
    </div>
);

const Ambisyon = (
    <div style={{ width: "100%", textAlign: "left" }}>
        <Image src={ambisyon} height={75} width={150} alt="Ambisyon" />
    </div>
);
export default memo(PreviewHeader);
