import Procurements from '@components/admin/procurements'
import ProcurementLayout from '@components/admin/procurements/pagination'
const Page = function () {
    return (
        <ProcurementLayout>
            <Procurements />
        </ProcurementLayout>
    )
}

export default Page;