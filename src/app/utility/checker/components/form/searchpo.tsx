"use client";

import React, { forwardRef, useState } from "react";
import { Select, SelectProps, Spin, Empty, Flex } from "antd";
import { useDebounce } from "react-use";

const SearchComponent = forwardRef(function SearchPO(props: SelectProps & {}, ref: any) {
    const { ...rest } = props;
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState<any>([]);
    const [query, setQuery] = useState("");
    const onSearch = (val: string) => {
        setQuery(val);
    };

    useDebounce(
        () => {
            if (query !== "") {
                setFetching(true);
                fetch(`/utility/checker/api/search?q=${query}`)
                    .then((res) => res.json())
                    .then((res) => {
                        const result = (res.data as Array<{ id: string; number: string }>).map((item) => {
                            return { label: item.number, value: item.id };
                        });
                        setOptions(result);
                        setFetching(false);
                    });
            }
        },
        1500,
        [query]
    );

    return (
        <Select
            ref={ref}
            style={{ width: "100%" }}
            labelInValue
            filterOption={false}
            showSearch
            onSearch={onSearch}
            notFoundContent={
                fetching ? (
                    <Flex style={{ height: 56 }} align="center" justify="center">
                        <Spin size="small" />
                    </Flex>
                ) : (
                    <Empty />
                )
            }
            size="large"
            allowClear
            {...props}
            options={options}
        />
    );
});

export default SearchComponent;
