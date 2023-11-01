'use client';

import { PropsWithChildren, createContext, useState } from "react";
import ContentWrapper from '@components/admin/content'
import NetworkError from "@components/admin/network-error";
import Header from './header'
import useSWR from "swr";
import { Skeleton } from "antd";

const SIZE = 8;
interface PaginationContext {
    data?: any[],
    isLoading: boolean,
    isValidating: boolean,
    error: any
}
export const PaginationContextWrapper = createContext<PaginationContext>({ data: [], isLoading: false, isValidating: false, error: null });

const UserLayout = function (props: PropsWithChildren<any>) {
    const [currentPage, setCurrentPage] = useState(0); //Active Current Page (next | prev)
    const { data, isLoading, isValidating, error } = useSWR<ResponseType[], any>(
        `/administrator/api/users?all=true&page=${currentPage}&size=${SIZE}`
    );
    //
    const context = { data, isLoading, isValidating, error }; //*context to Expose
    if (error) {
        return <NetworkError />
    }

    if (!data || isLoading) {
        return (
            <div style={{ padding: '25' }}>
                <Skeleton active />
            </div>
        )
    }


    return (
        <>
            <PaginationContextWrapper.Provider value={context}>
                <ContentWrapper header={
                    <Header
                        count={data.length}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        size={SIZE}
                    />
                }>
                    {props.children}
                </ContentWrapper>
            </PaginationContextWrapper.Provider>
        </>
    )
}

export default UserLayout;