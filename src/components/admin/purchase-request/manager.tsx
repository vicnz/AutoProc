import { FC, createContext, useContext, useReducer, PropsWithChildren } from "react"
//state
import { ActionType, IState, IAction, reducer, ReducerFunction, defaultValue } from './state'
//context
export {
    type IState,
    type IAction,
    ActionType
}

export const ReducerState = createContext<IState>({ preview: false })
export const ReducerDispatcher = createContext<any>((state: IState, action: IAction) => defaultValue)

const Manager = function (props: PropsWithChildren<any>) {
    const [state, dispatch] = useReducer(reducer, { preview: false })
    return (
        <>
            <ReducerDispatcher.Provider value={dispatch}>
                <ReducerState.Provider value={state}>
                    {props.children}
                </ReducerState.Provider>
            </ReducerDispatcher.Provider>
        </>
    )
}

export const useManager = () => {
    const state = useContext(ReducerState)
    const dispatch = useContext(ReducerDispatcher)
    return [state, dispatch]
}

export default Manager;