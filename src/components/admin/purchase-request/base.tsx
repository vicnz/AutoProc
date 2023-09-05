import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import { useState } from "react";
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
    return (
        <>
            <Manager>
                <Header />
                <Layout />
            </Manager>
        </>
    )
}


const Layout = () => {
    const [state, dispatch] = useManager()
    return (
        <div style={{ position: 'relative', overflowY: 'auto', height: 'calc(100vh - 168px)', width: 'inherit' }} >
            <div style={{ position: 'absolute', top: 0, left: 0, height: 'auto', width: 'inherit', paddingRight: '25px' }}>
                {
                    state?.preview === true ?
                        <PreviewPane /> :
                        <EditPane />
                }
            </div>
        </div>
    )
}

export default PurchaseRequest;