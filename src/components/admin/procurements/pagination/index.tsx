'use client';

import useSWR from 'swr'
import ContentWrapper from '@components/admin/content'
import { PropsWithChildren, createContext, useState } from "react";
import Header from '../header'
//constants
const URI = '/administrator/procurements/api'
const SIZE = 8

export const ProcurementListContext = createContext<{ data: any, isLoading: boolean, isValidating: boolean, error: any }>({ data: [], isLoading: false, isValidating: false, error: null })

const ProcurementsLayout = function (props: PropsWithChildren<any>) {
    const [currentPage, setCurrentPage] = useState(0)
    const { data, isLoading, isValidating, error } = useSWR(`/administrator/procurements/api?page=${currentPage}&size=${SIZE}`, (...args) => fetch(...args).then(res => res.json()))
    const context = { data, isLoading, isValidating, error }
    return (
        <>
            <ProcurementListContext.Provider value={context}>
                <ContentWrapper header={<Header data={data?.length} currentPage={currentPage} setCurrentPage={setCurrentPage} size={SIZE} />} >
                    {props.children}
                </ContentWrapper>
            </ProcurementListContext.Provider>
        </>
    )
}


export default ProcurementsLayout;