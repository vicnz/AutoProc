import useSWR from 'swr'

export enum ReqType {
    OUTLINE = 'outline',
    CUR_MONTHLY = 'curmonth'
}
//@ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

function useDashboardData(reqtype: ReqType) {
    const { data, error, isLoading, isValidating, mutate } = useSWR(`/administrator/api/summary?reqtype=${reqtype}`, fetcher)
    return {
        data, error, isLoading, isValidating, mutate
    }
}

export default useDashboardData;