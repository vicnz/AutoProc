import { ContentWrapperHasHeader } from '../_components/shared/content'
import Header from '../_components/records/headersection'
import SuspenseLoading from '../_components/shared/loading'
import dynamic from 'next/dynamic'

const TableView = dynamic(async () => await import('../_components/records/TableView'), { ssr: false, loading: () => <SuspenseLoading /> })

const RecordsMain = () => {
    return (
        <ContentWrapperHasHeader header={<Header title='RECORDS' />}>
            <TableView />
        </ContentWrapperHasHeader>
    )
}



export default RecordsMain;