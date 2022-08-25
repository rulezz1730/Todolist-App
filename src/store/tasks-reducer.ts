import {TasksStateType} from "../AppWithRedux";
import {AddTodoListActionType, RemoveTodoListActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistsApi, UpdateModelTaskType} from "../api-services/http.service";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


export type RemoveTaskType = {
    type: "REMOVE-TASK";
    todoListID: string;
    taskId: string;
}
export type CreateTaskACType = {
    type: "ADD-TASK";
    task: TaskType;
}
export type UpdateTaskType = {
    type: "UPDATE_TASK";
    model: UpdateDomainTaskModelType;
    todoListID: string;
    taskId: string;

}
export type SetTasksType = {
    type: "SET_TASKS"
    todolistId: string,
    tasks: Array<TaskType>
}
export type ActionsTypes = RemoveTaskType | CreateTaskACType
    | AddTodoListActionType | RemoveTodoListActionType
    | SetTasksType | SetTodolistsActionType
    | UpdateTaskType;

export const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(el => el.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [{...action.task}, ...state[action.task.todoListId]]
            }
        case "UPDATE_TASK":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(el =>
                    el.id === action.taskId
                        ? {...el, ...action.model}
                        : el
                )
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy
        case "SET_TASKS":
            return {...state, [action.todolistId]: action.tasks}
        case "SET_TODOLISTS":
            const copyState = {...state}
            action.todolists.forEach(tl => copyState[tl.id] = [])
            return copyState;
        default:
            return state
    }
}

//ActionCreators
export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskType => {
    return {type: "REMOVE-TASK", todoListID, taskId}
}
export const createTaskAC = (task: TaskType): CreateTaskACType => {
    return {type: "ADD-TASK", task}
}
export const updateTaskAC = (taskId: string, todoListID: string, model: UpdateDomainTaskModelType,): UpdateTaskType => {
    return {type: "UPDATE_TASK", model, todoListID, taskId}
}

export const setTasksAC = (todolistId: string, tasks: TaskType[]): SetTasksType => ({
    type: "SET_TASKS",
    todolistId,
    tasks
});


//ThunkCreators
export const fetchTasksTC = (todolistId: string): any => {
    return (dispatch: Dispatch): any => {
        todolistsApi.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(todolistId, res.data.items))
            })
    }
}
export const removeTaskTC = (id: string, todolistId: string): any => (dispatch: Dispatch): any => {
    todolistsApi.deleteTask(todolistId, id)
        .then(res => {
            dispatch(removeTaskAC(id, todolistId))
        })
}
export const createTaskTC = (title: string, todoListID: string): any => (dispatch: Dispatch): any => {
    todolistsApi.createNewTask(todoListID, title)
        .then(res => {
            dispatch(createTaskAC(res.data.data.item))
        })
}

type UpdateDomainTaskModelType = {
    title?: string,
    description?: string | null,
    status?: TaskStatuses,
    priority?: number,
    startDate?: string,
    deadline?: string,
}
export const updateTaskTC =
    (taskId: string, todoListID: string, domainModel: UpdateDomainTaskModelType): any =>
        (dispatch: Dispatch, getState: () => AppRootStateType): any => {
            const {tasks} = getState()
            const serachedTask = tasks[todoListID].find(task => task.id === taskId)
            if (!serachedTask) {
                console.warn("Task not found in this state")
                return
            }
            const apiModel: UpdateModelTaskType = {
                title: serachedTask.title,
                description: serachedTask.description,
                status: serachedTask.status,
                priority: serachedTask.priority,
                startDate: serachedTask.startDate,
                deadline: serachedTask.deadline,
                ...domainModel
            }
            todolistsApi.updateTaskTitle(todoListID, taskId, apiModel)
                .then(res => {
                    dispatch(updateTaskAC(taskId, todoListID, domainModel))
                })
        }