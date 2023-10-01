'use client';

import { PropsWithChildren } from 'react'
import { SWRConfig, SWRConfiguration } from 'swr'

const Config: SWRConfiguration = {
    fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
}

const SWRConfigWrapper = function (props: PropsWithChildren<any>) {
    return (
        <SWRConfig
            value={Config}
        >
            {props.children}
        </SWRConfig>
    )
}

export default SWRConfigWrapper;