"use client";

import { Descriptions, Flex, Result, Skeleton } from "antd";
import { CSSProperties, useRef, useState } from "react";
import Header from "./components/header";
import useSWR from "swr";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";
import Preview from "./components/render-report";

const WrapperStyle: CSSProperties = {
    height: "calc(100vh - 168px)",
    width: "100%",
    position: "relative",
    overflow: "auto",
};

const ScrollViewStyle: CSSProperties = {
    position: "absolute",
    height: "auto",
    width: "inherit",
    top: 0,
    left: 0,
};

function ReportsPage() {
    //initale date
    const initDate = dayjs();
    const initialDateRange: [string, string] = [initDate.subtract(7, "days").toISOString(), initDate.toISOString()];
    //
    const [dateRange, setDateRange] = useState<[string, string]>(initialDateRange);
    const { data, isLoading, error } = useSWR(
        `/administrator/dashboard/api/genreport?startDate=${dateRange[0]}&endDate=${dateRange[1]}`
    );

    //Printable
    const printableComponent = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => printableComponent.current,
    });

    const onSubmit = (data: [string, string]) => {
        setDateRange(data);
    };
    return (
        <div>
            <Flex style={{ height: 56 }} align="center" justify="space-between">
                <Header onSubmit={onSubmit} handlePrint={() => handlePrint()} />
            </Flex>
            <div style={WrapperStyle}>
                <div style={ScrollViewStyle}>
                    {error ? (
                        <Result status="error" title="Failed To Fetch Data" />
                    ) : !data || isLoading ? (
                        <Skeleton active />
                    ) : (
                        <Preview data={data} ref={printableComponent} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReportsPage;
