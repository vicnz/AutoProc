"use client";
/**
 * * - SELECT END USER [PR MANAGEMENT] MINI-FEATURE
 * * - Select End-Users for the Procurement Document
 */

import { Skeleton } from "antd";
import { forwardRef, memo } from "react";
import useSWR from "swr";
// SELECT USER COMPONENT
import SelectUser from "./user";

//
const SelectUserWrapper = forwardRef(function SelectUserWrap(props: { isEdit?: boolean }, ref) {
    //FETCH ONLY PARTIAL DATA
    const { data, error, isLoading, isValidating } = useSWR("/administrator/api/user?pick_only=true");

    if (error) {
        return <span>Error Loading Data....</span>;
    }
    if (!data || isLoading) {
        return <Skeleton.Input active />;
    }

    return (
        <>
            <SelectUser {...props} data={data} ref={ref} disabled={props.isEdit} />
        </>
    );
});

export default memo(SelectUserWrapper);
