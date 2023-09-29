'use client';
//PR Context
import { ReactNode, createContext, useContext } from "react";

const PRIDContext = createContext<any>('')
export const usePrId = function () {
    return useContext(PRIDContext)
}
export default function (props: { id: string, children: ReactNode }) {
    return (
        <PRIDContext.Provider value={props.id}>
            {props.children}
        </PRIDContext.Provider>
    )
}