'use client';
//!FIXME
//- The Shared PR Id
//- Sometimes unreachable to some components
//- Can caused by the use of Server Components
//- Need Fixing

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
