import {AppActionsType, AppThunk} from "./store";

export enum AppStatus {
    idle = 'idle',
    progress = 'progress',
    success = 'success',
    failed = 'failed'
}

const initialState: InitialAppStateType = {
    error: null,
    status: AppStatus.idle
}

export const appReducer = (state: InitialAppStateType = initialState, action: AppActionsType):InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        case "APP/SET_STATUS":
            return {...state, status: action.status}
        default:
            return state
    }
}


//actions
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)
export const setAppStatusAC = (status: AppStatus) => ({type: "APP/SET_STATUS", status} as const);

//thunks
export const setAppErrorTC = (error: string | null): AppThunk => (dispatch) => {
    dispatch(setAppErrorAC(error))
}

//types
export type InitialAppStateType = {
    error: string | null,
    status: AppStatus,
}

//types --> actionsType
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export type ActionsType = SetAppStatusActionType | SetAppErrorActionType