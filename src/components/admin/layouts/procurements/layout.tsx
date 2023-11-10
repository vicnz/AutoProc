"use client";
//Libraries
import useSWR from "swr";
import { PropsWithChildren, createContext, useState } from "react";
//components
import ContentWrapper from "@components/admin/content";
import LoadingTemplate from "@components/admin/content/container";
import Header from "./header";

//constants
const SIZE = 8; //TODO FETCH THIS FROM SERVER SETTINGS
//types
import type { ResponseType } from "@api/admin/procurements/route";
import NetworkError from "@components/admin/network-error";
import { Skeleton } from "antd";
interface ProcurementListContextType {
    data?: ResponseType[];
    isLoading: boolean;
    isValidating: boolean;
    error: any;
}
//Share the Preloaded Page Data
export const ProcurementListContext = createContext<ProcurementListContextType>({
    data: [],
    isLoading: false,
    isValidating: false,
    error: null,
});
//
const ProcurementsLayout = function (props: PropsWithChildren<any>) {
    const [currentPage, setCurrentPage] = useState(0); //Active Current Page (next | prev)
    const { data, isLoading, isValidating, error } = useSWR<ResponseType[], any>(
        `/administrator/api/procurements?page=${currentPage}&size=${SIZE}`
    );
    //
    const context = { data, isLoading, isValidating, error }; //*context to Expose
    if (error) {
        return (
            <>
                <NetworkError />
            </>
        );
    } else {
        if (!data || isLoading) {
            return (
                <LoadingTemplate>
                    <div style={{ padding: "25" }}>
                        <Skeleton active />
                    </div>
                </LoadingTemplate>
            );
        } else {
            return (
                <>
                    <ProcurementListContext.Provider value={context}>
                        <ContentWrapper
                            header={
                                <Header
                                    count={data.length}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    size={SIZE}
                                />
                            }
                        >
                            {props.children}
                        </ContentWrapper>
                    </ProcurementListContext.Provider>
                </>
            );
        }
    }
};

export default ProcurementsLayout;
