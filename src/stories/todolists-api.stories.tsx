import React, {ChangeEvent, useEffect, useState} from 'react';
import {TaskStatuses, todolistsApi, TodolistType} from "../api-services/http.service";
import {string} from "prop-types";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<TodolistType[]>([])

    useEffect(() => {
        todolistsApi.getTodolists()
            .then(res => setState(res.data))
    }, [])

    return (
        <div>
            {state.length > 0
                ? state.map((el, index) => <p>{`${index + 1}. ${JSON.stringify(el)}`}</p>)
                : 'Create your first TODO'}
        </div>
    );
};

export const CreateTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    useEffect(() => {

    }, [])

    const handleCreateTodolistTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const handleSentNewTodolistTitle = () => {
        todolistsApi.createTodolist(title)
            .then(res => {
                setState(res.data.data)
                setTitle('')
            })
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input type="text" value={title} onChange={handleCreateTodolistTitle}
                   placeholder={'Write New Todolist Title'}/>
            <button onClick={handleSentNewTodolistTitle}>Create</button>
        </div>
    );
};
export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const handleSetTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const handleDeleteTodolist = async () => {
        await todolistsApi.deleteTodolist(todolistId)
            .then(res => setState(res.data))
            .then(data => setTodolistId(''))
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input type="text" value={todolistId} onChange={handleSetTodolistId} placeholder={'Write TodolistId'}/>
            <button onClick={handleDeleteTodolist}>Delete</button>
        </div>
    );
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>([])
    const [title, setTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const handleChangeTodolistTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const handleEnterTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const handleSentNewTodolistTitle = () => {
        if (!todolistId || !title) {
            return alert('YOU NOT ENTER TODOLISTID OR NEW TITLE')
        } else {
            todolistsApi.updateTodolist(title, todolistId)
                .then(res => {
                    setState(res.data)
                    setTodolistId('')
                    setTitle('')
                })
        }

    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input type="text" value={title} onChange={handleChangeTodolistTitle}
                   placeholder={'Write New Todolist Title'}/>
            <input type="text" value={todolistId} onChange={handleEnterTodolistId}
                   placeholder={'Write Todolist Id'}/>
            <button onClick={handleSentNewTodolistTitle}>Update</button>
        </div>
    );
};
export const GetTasks = () => {
    const [state, setState] = useState<any>([])
    const [todolistId, setTodolistId] = useState<string>('')

    const handleSetTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const handleSentRequestGettingTasks = () => {
        todolistsApi.getTasks(todolistId)
            .then(res => {
                setState(res.data.items)
                // setTodolistId('')
            })
    }
    return <div>
        <div>{state.length > 0
            //@ts-ignore
            ? state.map((el, index) => <p>{`${index + 1}. ${JSON.stringify(el)}`}</p>)
            : 'Create your first TASK'}
        </div>
        <input type="text" value={todolistId} onChange={handleSetTodolistId} placeholder={'Write TodolistId'}/>
        <button onClick={handleSentRequestGettingTasks}>Get tasks</button>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>([])
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const handleSetTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const handleSetTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const handleDeleteTask = () => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
                //Optional clean form of TodolistId and Task Id
                // setTodolistId('')
                // setTaskId('')
            })
    }

    return <>
        <div>
            {JSON.stringify(state)}
        </div>
        <input type="text" value={todolistId} onChange={handleSetTodolistId} placeholder={'Write TodolistId'}/>
        <input type="text" value={taskId} onChange={handleSetTaskId} placeholder={'Write TaskId'}/>

        <button onClick={handleDeleteTask}>Delete tasks</button>
    </>
}

export const CreateNewTask = () => {
    const [state, setState] = useState<any>([])
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')

    const handleSetTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const handleCreateTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const handleCreateTask = () => {
        if (!todolistId || !taskTitle) {
            return alert('YOU NOT ENTER TODOLISTID OR TASK TITLE')
        } else {
            todolistsApi.createNewTask(todolistId, taskTitle)
                .then(res => {
                    setState(res.data)
                    //Optional clean form of TodolistId and Task Id
                    // setTodolistId('')
                    // setTaskTitle('')
                })
        }
    }
    return <>
        <div>
            {JSON.stringify(state)}
        </div>
        <input type="text" value={todolistId} onChange={handleSetTodolistId} placeholder={'Write TodolistId'}/>
        <br/>
        <input type="text" value={taskTitle} onChange={handleCreateTaskTitle} placeholder={'Write Task Title'}/>
        <br/>
        <button onClick={handleCreateTask}>Create Task</button>
    </>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');

    const handleSetTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const handleSetTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const handleCreateNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const handleUpdateTask = () => {
        const payload = {
            title: taskTitle,
            description,
            status,
            priority,
            startDate,
            deadline,
        }

        if (!todolistId || !taskTitle) {
            return alert('YOU NOT ENTER TODOLISTID OR TASK TITLE')
        } else {
            todolistsApi.updateTaskTitle(todolistId, taskId, payload)
                .then(res => {
                    setState(JSON.stringify(res.data.data))
                    // setTodolistId('')
                    // setTaskTitle('')
                })
        }
    }

    return <>
        <div>
            {JSON.stringify(state)}
        </div>
        <input type="text" value={todolistId} onChange={handleSetTodolistId} placeholder={'Write TodolistId'}/>
        <br/>
        <input type="text" value={taskId} onChange={handleSetTaskId} placeholder={'Write TaskId'}/>
        <br/>
        <input type="text" value={taskTitle} onChange={handleCreateNewTaskTitle} placeholder={'Write Task Title'}/>
        <br/>
        <input type="text" value={description} onChange={(e) => setDescription(e.currentTarget.value)}
               placeholder={'Write Task Description'}/>
        <br/>
        <input type="text" value={status} onChange={(e) => setStatus(Number(e.currentTarget.value))}
               placeholder={'Write Task Status'}/> Set task status
        <br/>
        <input type="text" value={priority} onChange={(e) => setPriority(Number(e.currentTarget.value))}
               placeholder={'Write Task Priority'}/> Set task priority
        <br/>
        <button onClick={handleUpdateTask}>Update Task</button>
    </>
}





