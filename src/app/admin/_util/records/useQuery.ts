import useSWR from 'swr'

import { IPurchaseRequestPreview } from '../../../../../.tests/mockdata/pr'

export type IUseQueryProp = {
    tablename?: string,
    page?: number,
    count?: number,
    where?: string
}

//get List of Items
export function useQueryAll(props: IUseQueryProp) {
    const { data, error, isLoading } = useSWR(`/admin2/api/records`, (...args) => fetch(...args).then(res => res.json()))

    return {
        data: data as { data: IPurchaseRequestPreview[] },
        isLoading,
        isError: error
    }
}


export function useQueryOne(prop: IUseQueryProp) {
    const { data, error, isLoading } = useSWR('/admin2/api/records', (...args) => fetch(...args).then(res => res.json()))
    //TODO
}