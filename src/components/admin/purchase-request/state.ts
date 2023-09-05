import { FC, createContext } from 'react'

//
export enum ActionType {
    SAVE,
    UPDATE,
    UNDO,
    PREVIEW
}
export type IState = {
    preview: boolean
}

export const defaultValue: IState = {
    preview: false
}

export type IAction = {
    type: ActionType,
    payload?: any
}

export const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case ActionType.SAVE:
            //do database save here
            return { ...state }
        case ActionType.UNDO:
            //do data reset here
            return { ...state }
        case ActionType.UPDATE:
            //do data update here
            return { ...state, formValue: action.payload }
        case ActionType.PREVIEW:
            return { ...state, preview: !state.preview }
        default:
            return state
    }
}

export type ReducerFunction = typeof reducer;

