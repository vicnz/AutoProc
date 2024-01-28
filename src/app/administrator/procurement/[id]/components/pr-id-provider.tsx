'use client';
import {
    PropsWithChildren, createContext,
    memo,
    useContext,
    useState
} from "react";

//Purchase Request ID
const Context = createContext<any>(null);
export const useRecordId = function () {
    return useContext(Context);
};
//
const PRIDProvider = function (props: PropsWithChildren<{ id: string }>) {
    const [state, setState] = useState(props.id)
    return (
        <Context.Provider value={state}>
            {props.children}
        </Context.Provider>
    );
};

export default memo(PRIDProvider);
