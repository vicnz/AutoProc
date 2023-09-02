import DashboardContent from '@components/admin/dashboard/tabs'
import { ContentWrapperHasHeader } from '@components/shared/content'
import Header from '@components/admin/dashboard/header'

export default function AdminRootPage() {
    return (
        <ContentWrapperHasHeader header={<Header title='DASHBOARD' />}>
            <DashboardContent />
        </ContentWrapperHasHeader>
    )
}