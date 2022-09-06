import {useDispatch} from "react-redux";
import {AppThunkDispatch} from "../../../store/store";
import {
    changeTodolistFilterAC,
    deleteTodolistTC, fetchTodolistsTC,
    FilterType,
    updateTodolistTitleTC
} from "../../../store/todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@mui/material";
import Todolist from "./Todolist/Todolist";
import {useAppDispatch, useAppSelector, useAppThunkDispatch} from "../../../hooks/hooks";


type PropsType = {
    demo?: boolean
}

const TodolistsTable  = React.memo(({demo, ...props}: PropsType) => {
    console.log('Render Table of Todolists')
    const dispatch = useAppThunkDispatch()
    const actionDispatch = useAppDispatch()
    const todoLists = useAppSelector(state => state.todoLists)

    useEffect(() => {
        if(demo){
            return
        }
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const handleShowFiltredTasks = useCallback((filterValue: FilterType, todoListID: string) => {
        actionDispatch(changeTodolistFilterAC(filterValue, todoListID));
    }, [dispatch])

    const handleRemoveTodoList = useCallback((todoListID: string) => {
        const thunk = deleteTodolistTC(todoListID)
        dispatch(thunk);
    }, [dispatch])

    const onChangeTodolistTitle = useCallback((newTitle: string, todoListID: string) => {
        dispatch(updateTodolistTitleTC(newTitle, todoListID))
    }, [dispatch])


    return <>
        {todoLists.length
            ? todoLists.map(el => {
                    return (
                        <Grid key={el.id} item>
                            <Paper elevation={5} style={{padding: "15px"}}>
                                <Todolist
                                    key={el.id}
                                    todolist={el}
                                    // todoListID={el.id}
                                    // title={el.title}
                                    // filter={el.filter}
                                    filterTasks={handleShowFiltredTasks}
                                    removeTodoList={handleRemoveTodoList}
                                    onChangeTodolistTitle={onChangeTodolistTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                }
            )
            : <span style={{marginTop: "25px"}}>Create your first TodoList</span>
        }
    </>
})

export default TodolistsTable;