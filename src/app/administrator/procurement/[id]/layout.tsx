import React, { CSSProperties, ReactNode } from 'react'
import RecordIDContext from './components/pr-id-provider'
import ContentWrapper from '@components/content'
import Header from './components/header'
import db from '@lib/db'
import { notFound } from 'next/navigation'

//Content Styles
const WrapperStyles: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 250px",
    height: "calc(100vh - 112px)",
    width: "calc(100vw - 56px)",
};

const preload = async (id: string) => {
    const exists = await db.purchase_requests.findFirst({
        select: { id: true },
        where: {
            id
        }
    })

    if (exists) {
        return exists.id;
    } else {
        notFound();
    }
}

async function Layout(props: { params: { id: string }, children: ReactNode }) {
    const contextId = await preload(props.params.id)
    return (
        <RecordIDContext id={contextId}>
            <ContentWrapper header={<Header />}>
                <div style={WrapperStyles}>
                    {props.children}
                </div>
            </ContentWrapper>
        </RecordIDContext>
    )
}

export default Layout