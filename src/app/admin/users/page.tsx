import { ContentWrapperHasHeader } from '@components/shared/content'
import Header from '@components/admin/users/header'

const Users = function () {
    return (
        <>
            <ContentWrapperHasHeader header={<Header title={"Users"} />}>
                <h1>User List</h1>
            </ContentWrapperHasHeader>
        </>
    )
}

export default Users;