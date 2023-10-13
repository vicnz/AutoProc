"use client";

//libs
import { Divider, Result, Spin } from "antd";
import useSWR from "swr";
import { memo } from "react";
import dynamic from "next/dynamic";
//components
//APPROVAL BLOCK
const Approval = dynamic(async () => await import("./approval"), {
    loading: () => (
        <div style={{ width: "100%", textAlign: "center" }}>
            <Spin spinning />
        </div>
    ),
});
//REVIEW & RECOMMEND BLOCK
const Recommendation = dynamic(async () => await import("./recommendation"), {
    loading: () => (
        <div style={{ width: "100%", textAlign: "center" }}>
            <Spin spinning />
        </div>
    ),
});

//types
interface ApprovalBlockProps {
    enduser?: {
        name: string;
        department: string;
    };
    approval: boolean;
    single?: boolean;
}
//Approval Block Consumed by the Documents
const ApprovalBlock = function (props: ApprovalBlockProps) {
    //FETCH OFFICERS
    const { data, isLoading, error, isValidating } = useSWR(
        `/administrator/api/officer`
    );
    //
    if (error) {
        //FAILED TO FETCH OFFICERS
        return (
            <>
                <Result status="error" title="Unable to Load Data Please Reload Page" />
            </>
        );
    }

    if (!data || isLoading) {
        //STILL FETCHING OFFICER DATA
        return (
            <>
                <div style={{ width: "100%", textAlign: "center" }}>
                    <Spin spinning />
                </div>
            </>
        );
    }

    //RENDER SIGNATURE BLOCK
    return (
        <>
            <Divider>* * *</Divider>
            {props.approval ? (
                <Approval
                    officers={data}
                    enduser={props.enduser}
                    single={props.single}
                />
            ) : (
                <Recommendation officers={data} enduser={props.enduser} />
            )}
        </>
    );
};

export default memo(ApprovalBlock);
