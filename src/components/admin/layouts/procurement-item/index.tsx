'use client';
//libs
import { CSSProperties, PropsWithChildren } from 'react';
//components
import Header from './header'
import Content from '@components/admin/content'

//Content Styles
const WrapperStyles: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 250px",
    height: "calc(100vh - 112px)",
    width: "calc(100vw - 56px)",
};
//
const ProcurementItem = function (props: PropsWithChildren<{}>) {
    return (
        <Content header={<Header />}>
            <div style={WrapperStyles}>
                {props.children}
            </div>
        </Content>
    )
}

export default ProcurementItem;