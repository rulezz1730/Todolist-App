import {AddTodoListActionType, RemoveTodoListActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistsApi, UpdateModelTaskType} from "../api-services/http.service";
import {AppActionsType, AppRootStateType, AppThunk} from "./store";
import {AppStatus, setAppStatusAC} from "./app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../utils/error-utils";

export const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: AppActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todoListID]: state[action.todoListID].filter(el => el.id !== action.taskId)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [{...action.task}, ...state[action.task.todoListId]]}
        case "UPDATE_TASK":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .map(el => el.id === action.taskId ? {...el, ...action.model} : el)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy
        case "SET-TODOLISTS":
            const copyState = {...state}
            action.todolists.forEach(tl => copyState[tl.id] = [])
            return copyState;
        case "SET_TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

//ActionCreators
export const removeTaskAC = (taskId: string, todoListID: string) =>
    ({type: "REMOVE-TASK", todoListID, taskId} as const)
export const createTaskAC = (task: TaskType) =>
    ({type: "ADD-TASK", task} as const)
export const updateTaskAC = (taskId: string, todoListID: string, model: UpdateDomainTaskModelType) =>
    ({type: "UPDATE_TASK", model, todoListID, taskId} as const)
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: "SET_TASKS", todolistId, tasks} as const)


//ThunkCreators
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.progress))
    todolistsApi.getTasks(todolistId)
        .then(res => dispatch(setTasksAC(todolistId, res.data.items)))
        .catch(err => handleNetworkAppError(err, dispatch))
        .finally(() => dispatch(setAppStatusAC(AppStatus.idle)))
}

export const removeTaskTC = (id: string, todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.progress))
    todolistsApi.deleteTask(todolistId, id)
        .then(res => {
            if(res.data.resultCode === 0){
                dispatch(removeTaskAC(id, todolistId))
            }else{
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => handleNetworkAppError(err, dispatch))
        .finally(() => dispatch(setAppStatusAC(AppStatus.success)))
}

export const createTaskTC = (title: string, todoListID: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.progress))
    todolistsApi.createNewTask(todoListID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(createTaskAC(res.data.data.item))
                dispatch(setAppStatusAC(AppStatus.success))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleNetworkAppError(err, dispatch)
        })
}

export const updateTaskTC = (taskId: string, todoListID: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC(AppStatus.progress))
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
                if(res.data.resultCode === 0){
                    dispatch(updateTaskAC(taskId, todoListID, domainModel))
                    dispatch(setAppStatusAC(AppStatus.success))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(err => {
                handleNetworkAppError(err, dispatch)
            })
    }

//types
export type TasksStateType = {
    [todoListID: string]: TaskType[]
}

type UpdateDomainTaskModelType = {
    title?: string,
    description?: string | null,
    status?: TaskStatuses,
    priority?: number,
    startDate?: string,
    deadline?: string,
}
//types -> ActionsType
export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof createTaskAC>
    | AddTodoListActionType
    | RemoveTodoListActionType
    | ReturnType<typeof setTasksAC>
    | SetTodolistsActionType
    | ReturnType<typeof updateTaskAC>;