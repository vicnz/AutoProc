import { UserOutlined } from "@ant-design/icons"
import { AutoCompleteProps, AutoComplete, Card, Avatar, Spin } from "antd"
import { forwardRef, useState, useCallback } from "react"
import useSWR from "swr"

interface user {
    id: string,
    fname: string,
    mname?: string,
    lname: string,
    suffix?: string,
    profile?: any,
    department?: { name: string, description: string },
    section?: { name: string, description: string }
}

const SelectUser = forwardRef((props: AutoCompleteProps & { data: user[] }, ref) => {
    const [options, setOptions] = useState<Array<user>>(props.data)
    const [selected, setSelected] = useState<user | null>()

    const handleSearch = useCallback((value: string) => {
        setOptions(!value ? [] : props.data.filter((item: user) => item.fname.toLowerCase().startsWith(value.toLowerCase())))
    }, [options])

    const onSelect = (value: any) => {
        setSelected(options.find((item: user) => (item.id === value)))
    }

    const onClear = () => {
        setSelected(null)
    }

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }} >
            <AutoComplete
                {...props}
                ref={ref as any}
                options={...options.map((item: user) => (
                    { value: item.id, label: `${item.fname} ${item.mname ? item.mname + " " : ''} ${item.lname}${item.suffix ? ' ' + item.suffix : ''}` }
                ))}
                onSearch={handleSearch}
                onSelect={onSelect}
                style={{ width: 'inherit' }}
                allowClear
                onClear={onClear}
                virtual

            />
            {
                selected ?
                    <Card style={{ width: '100%' }}>
                        <Card.Meta
                            avatar={selected.profile ? <Avatar src={selected?.profile} /> : <Avatar icon={<UserOutlined />} />}
                            title={`${selected.fname} ${selected.mname ? selected.mname + " " : ''} ${selected.lname}${selected.suffix ? ' ' + selected.suffix : ''}`}
                            description={<span>{selected.department?.description} | <i>{selected?.section?.description}</i></span>}
                        />
                    </Card>
                    : null
            }
        </div>
    )
})

const SelectUserWrapper = forwardRef((props, ref) => {
    const { data, error, isLoading, isValidating } = useSWR('/administrator/api/user?reqtype=selection', (...params) => fetch(...params).then(res => res.json()))

    if (error) {
        return (<span>Error Loading Data....</span>)
    } else {
        (!data || isLoading) ?
            <Spin spinning /> :
            <SelectUser {...props} data={data} ref={ref} />
    }
})

export default SelectUserWrapper;