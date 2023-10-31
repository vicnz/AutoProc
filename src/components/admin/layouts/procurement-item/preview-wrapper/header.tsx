"use client";

/**
 * * PREVIEW HEADER SECTION
 * * COMPANY BRAND
 */
//lib
import Image from "next/image";
import { PropsWithChildren, memo } from "react";
//components
import header from '@media/templates/document-header.png';
//styles
import { HeaderStyle } from '@components/admin/layouts/procurement-item/preview-wrapper/styles'

//
const PreviewHeader = function (props: PropsWithChildren<{ height?: number }>) {
    return (
        <>
            <div style={{ ...HeaderStyle, }}>
                <div style={{ width: "100%" }}>
                    <Image src={header} alt="Document-Header" width={775} height={150} loading="lazy" style={{ width: '100%' }} />
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default memo(PreviewHeader);
