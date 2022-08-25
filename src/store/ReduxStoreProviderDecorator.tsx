import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "./store";
import {combineReducers, createStore, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {v1 as uuidv1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api-services/http.service";


const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {
            id: "todolsitId1",
            title: "What to learn",
            filter: "all",
            addedDate: "",
            order: 0,
        },
        {
            id: "todolsitId2",
            title: "What to buy",
            filter: "all",
            addedDate: "",
            order: 0
        },
    ],
    tasks: {
        "todolsitId1": [
            {
                id: uuidv1(),
                todoListId: "todolsitId1",
                title: "React",
                description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
            },
            {
                id: uuidv1(),
                todoListId: "todolsitId1",
                title: "Javascript",
                description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
            }
        ],
        "todolsitId2": [
            {
                id: uuidv1(),
                todoListId: "todolsitId2",
                title: "Bear",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: "",
            },
            {
                id: uuidv1(),
                todoListId: "todolsitId2",
                title: "Chips",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: "",
               }
        ],
    }
}

const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}