//PR Context
import { PropsWithChildren, createContext, memo, useContext } from "react";

//Purchase Request ID
const UserIdContext = createContext<any>("");
export const useUserID = function () {
    return useContext(UserIdContext);
};
//
const UserIdContextProvider = function (props: PropsWithChildren<{ id: string }>) {
    return <UserIdContext.Provider value={props.id}>{props.children}</UserIdContext.Provider>;
};

export default memo(UserIdContextProvider);
