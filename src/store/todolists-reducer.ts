import {todolistsApi, TodolistType} from "../api-services/http.service";
import {AppActionsType, AppThunk} from "./store";
import {AppStatus, setAppStatusAC} from "./app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../utils/error-utils";


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: AppActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all", entityStatus: AppStatus.idle}, ...state]
        case "CHANGE-TODOLIST":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(el => el.id === action.id ? {...el, entityStatus: action.status} : el)
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: AppStatus.idle}))
        default:
            return state;
    }
}

//ActionCreators
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: "SET-TODOLISTS", todolists} as const)
export const removeTodolistAC = (id: string) =>
    ({type: "REMOVE-TODOLIST", id} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: "ADD-TODOLIST", todolist} as const)
export const updateTodolistTitleAC = (newTitle: string, id: string) =>
    ({type: "CHANGE-TODOLIST", title: newTitle, id} as const)
export const changeTodolistFilterAC = (filter: FilterType, id: string) =>
    ({type: "CHANGE-TODOLIST-FILTER", filter, id} as const)
export const changeTodolistEntityStatusAC = (id: string, status: AppStatus) =>
    ({type: "CHANGE-TODOLIST-ENTITY-STATUS", status, id} as const)

//ThunkCreators
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.progress))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC(AppStatus.idle))
        })
        .catch(err => handleNetworkAppError(err, dispatch))
}

export const createTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.progress))
    todolistsApi.createTodolist(title)
        .then(res => {
            if(res.data.resultCode === 0){
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC(AppStatus.success))
            }else{
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => handleNetworkAppError(err, dispatch))
}

export const deleteTodolistTC = (id: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.progress))
    dispatch(changeTodolistEntityStatusAC(id, AppStatus.progress ))
    todolistsApi.deleteTodolist(id)
        .then(res => {
            if(res.data.resultCode === 0){
                dispatch(removeTodolistAC(id))
                dispatch(setAppStatusAC(AppStatus.success))
            }else{
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => handleNetworkAppError(err, dispatch))
}

export const updateTodolistTitleTC = (newTitle: string, id: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.progress))
    todolistsApi.updateTodolist(newTitle, id)
        .then(res => {
            dispatch(updateTodolistTitleAC(newTitle, id))
            dispatch(setAppStatusAC(AppStatus.success))
        })
        .catch(err => handleNetworkAppError(err, dispatch))
}

//types
export type FilterType = "all" | "active" | "complete";
export type TodolistDomainType = TodolistType & {
    filter: FilterType;
    entityStatus: AppStatus
}
//types -> Actions type
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>
export type AddTodoListActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type TodolistActionsType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | SetTodolistsActionType
    | ReturnType<typeof updateTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>;


