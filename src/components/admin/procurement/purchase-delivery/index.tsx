"use client";

/**
 * * DELIVERY MONITORING
 * * ONCE THE PR IS FINAL
 * * THE FEATURE FOR DELIVERY MONITORING
 * * IS APPLIED AND OPENED
 */

//libs
import { CSSProperties, memo } from "react";
import { Skeleton } from "antd";
import useSWR from "swr";
import dynamic from "next/dynamic";
//components
import SubHeader from "@components/admin/procurement/subheader"; //Subheader
import { usePRId } from "../../pr-number";
import NetworkError from "@components/admin/network-error";
import RequireFinal from "./requirefinal";
import CreateNewDelivery from "./create";
//preloaded
const DeliveryItems = dynamic(async () => await import("./items"), { loading: () => <Skeleton active /> });
const DeliveryStatus = dynamic(async () => await import("./status"), { loading: () => <Skeleton active /> });
const MakeFinal = dynamic(async () => await import("./final"), { loading: () => <Skeleton.Button active /> });
//configs
const WrapperStyles: CSSProperties = {
    display: "grid",
    gridTemplateRows: "56px 1fr",
    width: "100%",
    height: "calc(100vh - 112px)",
};
//
const DeliveryView = function () {
    const id = usePRId();
    const { data, isLoading, error } = useSWR(`/administrator/api/delivery?_id=${encodeURIComponent(id)}`);

    if (error) {
        return (
            <NetworkError
                title="Failed To Load Delivery Information"
                subTitle="Please Reload Page or Try Again Later"
            />
        );
    }

    if (!data || isLoading) {
        return <Skeleton active />;
    } else {
        // ? CHECK If Purchase Order Is Final
        if (data.requiredFinal === true) {
            return (
                <RequireFinal
                    title="Required Purchase Order to be Final"
                    subTitle="Purchase Order required to be final first"
                />
            );
        }

        //? CREATE new Delivery Order
        if (data.empty === true) {
            return <CreateNewDelivery />;
        } else {

            const { startDate, endDate, number, supplier, id: deliveryId, progress, final } = data;
            const { name, address } = supplier;
            return (
                <>
                    <div style={WrapperStyles}>
                        {/* SUBHEADER */}
                        <SubHeader leading={"DELIVERY"}>
                            <MakeFinal final={final} id={deliveryId} progress={data.progress} />
                        </SubHeader>
                        {/* WRAPPER */}
                        <div
                            style={{
                                position: "relative",
                                height: "calc(100vh - 168px)",
                                width: "100%",
                                overflowY: "auto",
                            }}
                        >
                            {/* SCROLLABLE PANE */}
                            <div
                                style={{
                                    padding: "10px 0",
                                    height: "auto",
                                    width: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    gap: 15,
                                }}
                            >
                                {/* DELIVERY SUMMARY STATUS */}
                                <DeliveryStatus
                                    progress={progress}
                                    number={number}
                                    endDate={endDate}
                                    startDate={startDate}
                                    supplier={name}
                                    address={address}
                                    id={deliveryId}
                                    final={final}
                                />
                                <br />
                                {/* DELIVERY STATUS CHECKLIST */}
                                <DeliveryItems data={data.parcels} id={deliveryId} final={final} />
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
};

export default memo(DeliveryView);
