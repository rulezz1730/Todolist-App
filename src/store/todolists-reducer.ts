import {todolistsApi, TodolistType} from "../api-services/http.service";
import {Dispatch} from "redux";

export type FilterType = "all" | "active" | "complete";
export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST";
    id: string;
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST";
    todolist: TodolistType
    // title: string;
    // todolistId: string;
}
export type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE";
    id: string;
    title: string;
}
export type ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER";
    id: string;
    filter: FilterType;
}
export type SetTodolistsActionType = {
    type: "SET_TODOLISTS",
    todolists: Array<TodolistType>
}

export type ActionsTypes =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodolistsActionType;

export type TodolistDomainType = TodolistType & {
    filter: FilterType;
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.id)
        case "ADD-TODOLIST":
            return [
                {...action.todolist, filter: "all"},
                ...state
            ]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id
                ? {
                    ...tl,
                    title: action.title,
                }
                : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.id
                ? {
                    ...el,
                    filter: action.filter
                }
                : el)
        case "SET_TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "all"}))
        default:
            return state;
    }
}

//ActionCreators
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => ({
    type: "SET_TODOLISTS",
    todolists
})
export const removeTodolistAC = (id: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id: id}
}
export const addTodolistAC = (todolist: TodolistType): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", todolist}
}

export const updateTodolistTitleAC = (newTitle: string, id: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", title: newTitle, id: id}
}
export const changeTodolistFilterAC = (filter: FilterType, id: string): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id}
}

//ThunkCreators
export const fetchTodolistsTC = (): any => (dispatch: Dispatch): any => {
    todolistsApi.getTodolists().then(res => {
        dispatch(setTodolistsAC(res.data))
    })
}
export const createTodolistTC = (title: string): any => (dispatch: Dispatch): any => {
    todolistsApi.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const deleteTodolistTC = (id: string): any => (dispatch: Dispatch): any => {
    todolistsApi.deleteTodolist(id)
        .then(res => {
            dispatch(removeTodolistAC(id))
        })
}
export const updateTodolistTitleTC = (newTitle: string, id: string): any => (dispatch: Dispatch): any => {
    todolistsApi.updateTodolist(newTitle, id)
        .then(res => {
            dispatch(updateTodolistTitleAC(newTitle, id))
        })
}


