import React, { forwardRef, useEffect, useState } from 'react'
import { Select } from 'antd'
import { getUnit } from './server'

const SelectUnit = forwardRef(function Selector(props: any, ref) {
    const [options, setOptions] = useState<any>([])

    useEffect(() => {
        (async () => {
            const units = await getUnit()
            setOptions(
                units.map(item => ({ label: item.name, value: item.id }))
            )
        })()
    }, [])

    return (
        <>
            <Select
                {...props}
                ref={ref as any}
                style={{ width: 135 }}
                placeholder="Unit of Issue"
                options={options}
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        {/* <AddUnit btnProps={{ block: true }} /> */}
                    </>
                )}
            />
        </>
    )
})

export default SelectUnit;