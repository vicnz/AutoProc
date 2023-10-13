'use client'; //TODO

//PR Context
import {
    PropsWithChildren, createContext,
    memo,
    useContext
} from "react";

//Purchase Request ID
const PRIDContext = createContext<any>("");
export const usePRId = function () {
    return useContext(PRIDContext);
};
//
const PRIDProvider = function (props: PropsWithChildren<{ id: string }>) {
    return (
        <PRIDContext.Provider value={props.id}>
            {props.children}
        </PRIDContext.Provider>
    );
};

export default memo(PRIDProvider);
