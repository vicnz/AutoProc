import UserManagementLayout from '@components/admin/layouts/user-management/layout'
import UserManagement from '@components/admin/layouts/user-management'
const Page = function () {
    return (
        <>
            <UserManagementLayout>
                <UserManagement />
            </UserManagementLayout>
        </>
    )
}

export default Page;