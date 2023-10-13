"use client";

import { Select, SelectProps } from "antd";
import { forwardRef, memo, useMemo } from "react";

//
interface SelectLowestBidderProps {
    data: any[]; //TODO genuine types
}
//
const SelectLowestBidder = forwardRef(function SelectLowestBid(
    props: SelectLowestBidderProps,
    ref
) {
    //Item
    const options = useMemo(() => {
        const opt: SelectProps["options"] = props.data.map((item) => {
            return {
                label: item.name,
                value: item.id,
            };
        });

        return opt;
    }, [props.data]);
    return <Select {...props} ref={ref as any} options={options} />;
});

export default memo(SelectLowestBidder);
