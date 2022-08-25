import React, {useCallback, useEffect} from "react";
import styles from '../index.module.css'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, IconButton} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {fetchTasksTC, removeTaskTC, createTaskTC, updateTaskTC} from "../store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import Task from "./Task";
import {TaskStatuses, TaskType} from "../api-services/http.service";
import {FilterType, updateTodolistTitleTC} from "../store/todolists-reducer";


type TodolistPropsType = {
    todoListID: string;
    filter: FilterType;
    title: string;
    filterTasks: (id: FilterType, todoListID: string) => void;
    removeTodoList: (todoListID: string) => void;
    onChangeTodoListTitle: (newTitle: string, todoListID: string) => void;
};

export const Todolist = React.memo(({
                                        todoListID,
                                        title,
                                        filterTasks,
                                        filter,
                                        removeTodoList,
                                        onChangeTodoListTitle
                                    }: TodolistPropsType) => {

    console.log('Im todolist called ' + todoListID)

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoListID])

    useEffect(() => {
        dispatch(fetchTasksTC(todoListID))
    }, [dispatch, todoListID])


    let tasksForTodoList = tasks;
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (filter === "complete") {
        tasksForTodoList = tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    const handleChangeFilter = useCallback((filter: FilterType) => filterTasks(filter, todoListID), [filterTasks, todoListID])

    const onChangeTodoListTitleHandler = useCallback((newTitle: string, todoListID: string) => {
        dispatch(updateTodolistTitleTC(newTitle, todoListID))
    }, [dispatch])

    const addTaskWrap = useCallback((title: string) => {
        dispatch(createTaskTC(title, todoListID));
    }, [dispatch, todoListID])

    const onChangeCheckTask = useCallback((taskId: string, checkedValue: boolean) => {
        const status = checkedValue ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(taskId, todoListID, {status}));
    }, [dispatch, todoListID])


    const onChangeTaskTitleHandler = useCallback((newTitle: string, taskId: string) => {
        dispatch(updateTaskTC(taskId, todoListID, {title:newTitle},))
    }, [dispatch, todoListID])

    const onRemoveTask = useCallback((taskId: string, todoListID: string) => {
        const thunk = removeTaskTC(taskId, todoListID)
        dispatch(thunk)
    }, [dispatch])

    return (
        <div>
            <div className={styles.titleBlock}>
                <h3><EditableSpan title={title} onChange={onChangeTodoListTitleHandler} tId={todoListID}/></h3>
                <IconButton aria-label="delete" color={'error'} onClick={() => removeTodoList(todoListID)}>
                    <HighlightOffIcon/>
                </IconButton>
            </div>

            <AddItemForm addItem={addTaskWrap}/>

            <div>
                {
                    tasksForTodoList.map(el =>
                        (<Task task={el}
                               onChangeCheckTask={onChangeCheckTask}
                               onChangeTaskTitleHandler={onChangeTaskTitleHandler}
                               todoListID={todoListID}
                               onRemoveTask={onRemoveTask}
                               key={el.id}
                               filter={filter}
                            />

                        )
                    )
                }

            </div>
            <div>
                <ButtonGroup size="small" aria-label="small button group">
                    <Button key="one"
                            color={"primary"}
                            variant={filter === "all" ? "contained" : "text"}
                            onClick={() => handleChangeFilter('all')}>
                        All
                    </Button>
                    <Button key="two"
                            color={"info"}
                            variant={filter === "active" ? "contained" : "text"}
                            onClick={() => handleChangeFilter("active")}>
                        Active
                    </Button>
                    <Button key="three"
                            color={"secondary"}
                            variant={filter === "complete" ? "contained" : "text"}
                            onClick={() => handleChangeFilter('complete')}>
                        Complete
                    </Button>
                </ButtonGroup>
            </div>
        </div>)
})

export default Todolist;




