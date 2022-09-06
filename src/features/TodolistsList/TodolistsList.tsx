import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {createTodolistTC} from "../../store/todolists-reducer";
import React, {useCallback} from "react";
import {Grid, Paper} from "@mui/material";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import TodolistsTable from "./TodolistsTable/TodolistsTable";
import {AppThunkDispatch} from "../../store/store";
import {useAppThunkDispatch} from "../../hooks/hooks";

type PropsType = {
    demo?: boolean
}

const TodolistsList = React.memo(({demo, ...props}: PropsType) => {
    console.log('Render List of todolists')
    const dispatch = useAppThunkDispatch()

    const addTodoList = useCallback((title: string) => {
        const thunk = createTodolistTC(title)
        dispatch(thunk);
    }, [dispatch])

    return <>
        <Grid container>
            <Paper elevation={5} style={{padding: "15px", marginBottom: '20px', marginTop: '20px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Paper>
        </Grid>
        <Grid container spacing={4}>
            <TodolistsTable demo={demo}/>
        </Grid>
    </>
})

export default TodolistsList;
