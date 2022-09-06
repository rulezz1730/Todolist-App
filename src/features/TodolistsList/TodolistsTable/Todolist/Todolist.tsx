import React, {useCallback, useEffect} from "react";
import styles from '../../../../index.module.css'
import AddItemForm from "../../../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../../../components/EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {createTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC} from "../../../../store/tasks-reducer";
import Task from "./Task/Task";
import {TaskStatuses} from "../../../../api-services/http.service";
import {FilterType, TodolistDomainType} from "../../../../store/todolists-reducer";
import {useAppSelector, useAppThunkDispatch} from "../../../../hooks/hooks";
import {AppStatus} from "../../../../store/app-reducer";


type TodolistPropsType = {
    todolist: TodolistDomainType
    filterTasks: (id: FilterType, todoListID: string) => void,
    removeTodoList: (todoListID: string) => void,
    onChangeTodolistTitle: (newTitle: string, todoListID: string) => void,
    demo?: boolean,
};

export const Todolist = React.memo(({
                                        demo,
                                        todolist,
                                        filterTasks,
                                        removeTodoList,
                                        onChangeTodolistTitle
                                    }: TodolistPropsType) => {

    console.log('Im todolist called ' + todolist.id)

    const dispatch = useAppThunkDispatch()
    const tasks = useAppSelector(state => state.tasks[todolist.id])
    const disabled = todolist.entityStatus === AppStatus.progress

    useEffect(() => {
        if (demo) {
            return
        }
    dispatch(fetchTasksTC(todolist.id))
    }, [dispatch, todolist.id])

    let tasksForTodoList = tasks;
    if (todolist.filter === 'active') {
        tasksForTodoList = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (todolist.filter === "complete") {
        tasksForTodoList = tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    const handleChangeFilter = useCallback((filter: FilterType) => filterTasks(filter, todolist.id), [filterTasks, todolist.id])


    const addTaskWrap = useCallback((title: string) => {
    dispatch(createTaskTC(title, todolist.id));
    }, [dispatch, todolist.id])

    const onChangeCheckTask = useCallback((taskId: string, checkedValue: boolean) => {
        const status = checkedValue ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(updateTaskTC(taskId, todolist.id, {status}));
    }, [dispatch, todolist.id])


    const onChangeTaskTitleHandler = useCallback((newTitle: string, taskId: string) => {
    dispatch(updateTaskTC(taskId, todolist.id, {title: newTitle},))
    }, [dispatch, todolist.id])

    const onRemoveTask = useCallback((taskId: string, todoListID: string) => {
        const thunk = removeTaskTC(taskId, todoListID)
        dispatch(thunk)
    }, [dispatch])

    return (
        <div>
            <div className={styles.titleBlock}>
                <h3><EditableSpan title={todolist.title} onChange={onChangeTodolistTitle} tId={todolist.id}/></h3>
                <IconButton aria-label="delete" color={'error'} onClick={() => removeTodoList(todolist.id)} disabled={disabled}>
                    <HighlightOffIcon/>
                </IconButton>
            </div>

            <AddItemForm addItem={addTaskWrap} disabled={disabled}/>

            <div>
                {
                    tasksForTodoList.map(el =>
                        (<Task task={el}
                               onChangeCheckTask={onChangeCheckTask}
                               onChangeTaskTitleHandler={onChangeTaskTitleHandler}
                               // todoListID={todoListID}
                               todoListID={todolist.id}
                               onRemoveTask={onRemoveTask}
                               key={el.id}
                               filter={todolist.filter}
                               // filter={filter}
                            />
                        )
                    )
                }

            </div>
            <div>
                <ButtonGroup size="small" aria-label="small button group">
                    <Button key="one"
                            color={"primary"}
                            variant={todolist.filter === "all" ? "contained" : "text"}
                            // variant={filter === "all" ? "contained" : "text"}
                            onClick={() => handleChangeFilter('all')}>
                        All
                    </Button>
                    <Button key="two"
                            color={"info"}
                            variant={todolist.filter === "active" ? "contained" : "text"}
                            // variant={filter === "active" ? "contained" : "text"}
                            onClick={() => handleChangeFilter("active")}>
                        Active
                    </Button>
                    <Button key="three"
                            color={"secondary"}
                            variant={todolist.filter === "complete" ? "contained" : "text"}
                            // variant={filter === "complete" ? "contained" : "text"}
                            onClick={() => handleChangeFilter('complete')}>
                        Complete
                    </Button>
                </ButtonGroup>
            </div>
        </div>)
})

export default Todolist;




