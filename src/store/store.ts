import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunkMiddleware from "redux-thunk";


const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));


// @ts-ignore
window.store = store