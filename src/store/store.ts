import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodolistActionsType, todolistsReducer, updateTodolistTitleAC} from "./todolists-reducer";
import {TasksActionsType, tasksReducer} from "./tasks-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {typeOptions} from "@testing-library/user-event/dist/type/typeImplementation";
import {appReducer, ActionsType} from "./app-reducer";

const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = TodolistActionsType | TasksActionsType | ActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppDispatch = typeof store.dispatch
// @ts-ignore
window.store = store