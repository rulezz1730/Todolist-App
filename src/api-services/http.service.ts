import axios from "axios";


const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "9206425a-d2c5-45d8-abdd-b4f570a309d8"
    }
};
const http = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    ...settings,
});


export type TodolistType = {
    id: string;
    addedDate: string;
    order: number;
    title: string;
};

type ResponseTodolistType<D = {}> = {
    resultCode: number
    fieldErrors: string[]
    messages: string[],
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskType = {
    id: string
    todoListId: string
    title: string
    description: string | null
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    order: number
    addedDate: string
}

type GetTasksResponseType<T = {}> = {
    totalCount: number
    error: string
    items: T
}

export type UpdateModelTaskType = {
    title: string,
    description: string | null,
    status: TaskStatuses,
    priority: number,
    startDate: string,
    deadline: string,
}


export const todolistsApi = {
    async getTodolists() {
        return await http.get<Array<TodolistType>>('/todo-lists')
    },
    async createTodolist(title: string) {
        return await http.post<ResponseTodolistType<{ item: TodolistType }>>('/todo-lists', {title})
    },
    async deleteTodolist(id: string) {
        return await http.delete<ResponseTodolistType>(`/todo-lists/${id}`)
    },
    async updateTodolist(title: string, id: string) {
        return await http.put<ResponseTodolistType>(`/todo-lists/${id}`, {title})
    },
    async getTasks(todolistId: string) {
        return await http.get<GetTasksResponseType<TaskType[]>>(`/todo-lists/${todolistId}/tasks`)
    },

    async createNewTask(todolistId: string, title: string) {
        const payload = {
            title: title
        }
        return await http.post<ResponseTodolistType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks`, payload)
    },

    async deleteTask(todolistId: string, id: string) {
        return await http.delete<ResponseTodolistType>(`/todo-lists/${todolistId}/tasks/${id}`)
    },

    async updateTaskTitle(todolistId: string, id: string, model: UpdateModelTaskType) {
        return http.put<ResponseTodolistType<{ items: TaskType }>>(`todo-lists/${todolistId}/tasks/${id}`, model)
    }
};

