import { ContentWrapperHasHeader } from '@components/shared/content'
import Header from '@components/admin/records/header'
import dynamic from 'next/dynamic'
import { Skeleton } from 'antd'

const TableView = dynamic(async () => await import('@components/admin/records/tableview'), { ssr: false, loading: () => <div><Skeleton paragraph /></div> })

const RecordsMain = () => {
    return (
        <ContentWrapperHasHeader header={<Header title='RECORDS' />}>
            <TableView />
        </ContentWrapperHasHeader>
    )
}



export default RecordsMain;