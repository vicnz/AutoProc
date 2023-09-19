import prisma from '@lib/db'
import { Tabs } from 'antd';

import TabCols from './_components/tabs'
import DocStatus from './_components/status'
import { createContext, useContext } from 'react';
import PrIdContext from './pr-id-context'
//configs
//
const RecordItem = async function ({ params }: { params: { id: string } }) {
    return (
        <>
            <PrIdContext id={params.id}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 250px', height: 'calc(100vh - 112px)', width: 'calc(100vw - 56px)' }}>
                    <Tabs tabPosition='left' items={TabCols} defaultActiveKey='pr' />
                    <DocStatus />
                </div>
            </PrIdContext>
        </>
    )
}

export default RecordItem;