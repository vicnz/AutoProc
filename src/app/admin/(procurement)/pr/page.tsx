import { getNextjsCookie } from '@/lib/state/utils/server.cookies'
import SampleTable from '../../_components/table.test'
import { cookies } from 'next/headers'
import { server_component_pb } from '@/lib/state/pb/server.component'
// import { server_component_pb } from '@lib/state/pb/server.component'


type IPageProp = {
    params: { slug: string },
    searchParams: { [key: string]: string | string[] | undefined }
}


export default async function PRPage(props: IPageProp) {
    return (
        <>
            <SampleTable />
        </>
    )
}