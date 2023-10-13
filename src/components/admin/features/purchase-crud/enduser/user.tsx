"use client";

/**
 * * - SELECT USER [SUB-FEATURE] FROM SELECT ENDUSER
 * * - Select User Information
 */

import { AutoCompleteProps, AutoComplete } from "antd";
import { forwardRef, useState, useCallback, CSSProperties, memo } from "react";
import UserInforCard from "./user-card";
//types
interface user {
    id: string;
    name: string;
    profile?: any;
    department?: { name: string; description: string };
    section?: { name: string; description: string };
}

///STYLES
const WrapperStyles: CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
};
///
const SelectUser = forwardRef(function SelectUserWrapper(
    props: AutoCompleteProps & { data: user[] },
    ref
) {
    const { value } = props; //GET DEFAULT POPULATED USER INFORMATION
    const [options, setOptions] = useState<Array<user>>(props.data);
    const [selected, setSelected] = useState<any>(
        options.find((item: user) => item.id === value)
    );

    //SEARCH FOR USERS
    const handleSearch = useCallback(
        (value: string) => {
            setOptions(
                !value
                    ? []
                    : props.data.filter((item: user) => {
                        return item.name.toLowerCase().startsWith(value.toLowerCase());
                    })
            );
        },
        [props.data]
    );

    //UPDATE SELECTED USER
    const onSelect = (value: any) => {
        setSelected(options.find((item: user) => item.id === value));
    };

    //CLEAR USERS
    const onClear = () => {
        setSelected(null);
    };

    return (
        <div style={WrapperStyles}>
            <AutoComplete
                {...props}
                placeholder={`Type the User's Name`}
                ref={ref as any}
                onSearch={handleSearch}
                onSelect={onSelect}
                style={{ width: "inherit" }}
                allowClear
                onClear={onClear}
                virtual
                options={...options.map((item: any) => ({
                    value: item.id,
                    label: item.name,
                }))}
            />
            {/* SHOW SELECT USER */}
            {selected ? <UserInforCard selected={selected} /> : null}
        </div>
    );
});

export default memo(SelectUser);
