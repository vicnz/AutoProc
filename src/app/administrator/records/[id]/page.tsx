//libs
import { Tabs } from 'antd';
//components
import TabCols from './_components/tabs';
import DocStatus from './_components/status';
import PRIdProvider from './_components/pr-id-context';
//configs
//
const RecordItem = async function ({ params }: { params: { id: string } }) {
    return (
        <>
            <PRIdProvider id={params.id}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 250px', height: 'calc(100vh - 112px)', width: 'calc(100vw - 56px)' }}>
                    <Tabs tabPosition='left' items={TabCols} defaultActiveKey='pr' destroyInactiveTabPane />
                    <DocStatus />
                </div>
            </PRIdProvider>
        </>
    )
}

export default RecordItem;