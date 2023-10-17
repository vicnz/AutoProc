"use client";
//lib
import Image from "next/image";
import { CSSProperties, PropsWithChildren, memo } from "react";
//components
import header from '@media/templates/document-header.png';
//config

//styles
const WrapperStyle: CSSProperties = {
    display: "grid",
    placeItems: "center",
    width: 'inherit'
    // padding: "10px 25px",
};
//
const PreviewHeader = function (props: PropsWithChildren<{ height?: number }>) {
    return (
        <>
            <div style={{ ...WrapperStyle, }}>
                <div style={{ width: "100%" }}>
                    <Image src={header} alt="" width={775} height={150} loading="lazy" style={{ width: '100%' }} />
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default memo(PreviewHeader);
