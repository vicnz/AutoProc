import Procurements from '@components/admin/layouts/procurements'
import ProcurementLayout from '@components/admin/layouts/procurements/pagination'
//
const Page = function () {
    return (
        <ProcurementLayout>
            <Procurements />
        </ProcurementLayout>
    )
}

export default Page;