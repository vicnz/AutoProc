'use client';

import { usePbAuthListener } from './pb.auth.listener'
import { FC, PropsWithChildren } from 'react'

const Wrapper = (props: PropsWithChildren<any>) => {
    usePbAuthListener()
    return (
        <>
            {props?.children}
        </>
    )
}


export default Wrapper;