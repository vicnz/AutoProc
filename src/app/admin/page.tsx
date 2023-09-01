import { ContentWrapperHasHeader } from './_components/shared/content'
import Header from './_components/dashboard/headersection'
import DashboardContent from './_components/dashboard/TabSwitcher'

export default function AdminRootPage() {
    return (
        <ContentWrapperHasHeader header={<Header title='DASHBOARD' />}>
            <DashboardContent />
        </ContentWrapperHasHeader>
    )
}