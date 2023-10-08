'use client';
import Content from '@components/admin/content'
import Header from './header'
import { CSSProperties, PropsWithChildren } from 'react';

const WrapperStyles: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 250px",
    height: "calc(100vh - 112px)",
    width: "calc(100vw - 56px)",
};

const ProcurementItem = function (props: PropsWithChildren<any>) {
    return (
        <Content header={<Header />}>
            <div style={WrapperStyles}>
                {props.children}
            </div>
        </Content>
    )
}

export default ProcurementItem;