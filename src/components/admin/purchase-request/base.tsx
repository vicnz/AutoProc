import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import { ReactNode, useRef, useState } from "react";
import Header from './header';

//state
import Manager, { useManager } from './manager'

//components
const EditPane = dynamic(
    async () => await import('./edit'),
    {
        loading: () => (
            <Skeleton avatar paragraph={{ rows: 10 }} active />
        )
    }
)
const PreviewPane = dynamic(
    async () => await import('./preview'),
    {
        loading: () => (
            <Skeleton avatar />
        )
    }
)

const PurchaseRequest = function () {
    const printRef = useRef(null)
    return (
        <>
            <Manager>
                <Header printRef={printRef} />
                <Layout printRef={printRef} />
            </Manager>
        </>
    )
}


const Layout = (props: { printRef?: any }) => {
    const [state, dispatch] = useManager()
    return (
        <div style={{ position: 'relative', overflowY: 'auto', height: 'calc(100vh - 168px)', width: 'inherit' }} >
            <div style={{ position: 'absolute', top: 0, left: 0, height: 'auto', width: 'inherit', paddingRight: '25px' }}>
                {
                    state?.preview === true ?
                        <PreviewPane printRef={props?.printRef} /> :
                        <EditPane />
                }
            </div>
        </div>
    )
}

export default PurchaseRequest;