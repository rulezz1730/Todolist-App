import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import AddItemForm from "./components/AddItemForm";
import {Container, Grid, Paper} from '@mui/material';
import Header from "./components/Header";
import {
    changeTodolistFilterAC,
    createTodolistTC,
    deleteTodolistTC,
    fetchTodolistsTC,
    FilterType,
    TodolistDomainType,
    updateTodolistTitleTC,
} from "./store/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskType} from "./api-services/http.service";
import {Dispatch} from "redux";

export type TasksStateType = {
    [todoListID: string]: TaskType[]
}


const AppWithReducers = () => {
    console.log('i am App component')
    const dispatch = useDispatch<Dispatch>();
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists);

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const handleShowFiltredTasks = useCallback((filterValue: FilterType, todoListID: string) => {
        dispatch(changeTodolistFilterAC(filterValue, todoListID));
    }, [dispatch])

    const handleRemoveTodoList = useCallback((todoListID: string) => {
        const thunk = deleteTodolistTC(todoListID)
        dispatch(thunk);
    }, [dispatch])

    const handleChangeTodoListTitle = useCallback((newTitle: string, todoListID: string) => {
        dispatch(updateTodolistTitleTC(newTitle, todoListID));
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const thunk = createTodolistTC(title)
        dispatch(thunk);
    }, [dispatch])


    const todoListComponent = todoLists.length
        ? todoLists.map(el => {
                return (
                    <Grid key={el.id} item>
                        <Paper elevation={5} style={{padding: "15px"}}>
                            <Todolist
                                key={el.id}
                                todoListID={el.id}
                                title={el.title}
                                filter={el.filter}
                                filterTasks={handleShowFiltredTasks}
                                removeTodoList={handleRemoveTodoList}
                                onChangeTodoListTitle={handleChangeTodoListTitle}
                            />
                        </Paper>
                    </Grid>
                )
            }
        ) : (
            <span style={{marginTop: "25px"}}>Create your first TodoList</span>
        )

    return (
        <>
            <Header/>
            <Container fixed>
                <Grid container>
                    <Paper elevation={5} style={{padding: "15px", marginBottom: '20px', marginTop: '20px'}}>
                        <AddItemForm addItem={addTodoList}/>
                    </Paper>

                </Grid>
                <Grid container spacing={4}>
                    {todoListComponent}
                </Grid>
            </Container>
        </>
    );
}

export default AppWithReducers;
