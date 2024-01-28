import { AutoComplete, AutoCompleteProps, Card, FormInstance } from 'antd'
import React, { CSSProperties, forwardRef, useCallback, useEffect, useState } from 'react'
import { searchUser } from './server'

const WrapperStyles: CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
};

const SelectEndUser = forwardRef(function Selector(props: AutoCompleteProps & { instance: FormInstance }, ref) {
    const [options, setOptions] = useState<Array<any>>([])
    const [selected, setSelected] = useState<any>()

    const fetchUserlist = async (query: string) => {
        const response = await searchUser({ query, limit: 5 })
        return response;
    }

    const handleSearch = useCallback((value: string) => {
        setTimeout(async () => {
            if (!value && value.length > 3) {
                setOptions([])
            } else {
                let result = (await fetchUserlist(value))
                setOptions(result)
            }
        }, 1000)
    }, [])

    const onSelect = async (value: any) => {
        setSelected(options.find(item => value === item.id))
    }

    const onClear = () => {
        setSelected(null);
    };
    return (
        <div style={WrapperStyles}>
            <AutoComplete
                {...props}
                ref={ref as any}
                placeholder="Type User Name"
                onSearch={handleSearch}
                onSelect={onSelect}
                style={{ width: 'inherit' }}
                allowClear
                onClear={onClear}
                virtual
                options={[
                    ...options?.map(item => {
                        return { value: item.id, label: item.name }
                    })
                ]}
            />
            {selected ? (
                <Card style={{ width: "100%" }}>
                    <Card.Meta
                        title={
                            <span style={{ textTransform: "uppercase" }}>
                                {selected?.name}
                            </span>
                        }
                        description={
                            <span>
                                {selected.department} <i>{selected?.section}</i>
                            </span>
                        }
                    />
                </Card>
            ) : null}
        </div>
    )
})

export default SelectEndUser;