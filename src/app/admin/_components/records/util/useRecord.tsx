import useSWR from 'swr'

export function useQuery() {
    const { data, error, isLoading } = useSWR(`/admin/api/records`, (...args) => fetch(...args).then(res => res.json()))

    return {
        data: data,
        isLoading,
        isError: error
    }
} 
