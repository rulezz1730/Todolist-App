import React from 'react';
import './App.css';
import {Container, LinearProgress} from '@mui/material';
import Header from "../features/Header/Header";
import TodolistsList from "../features/TodolistsList/TodolistsList";
import CustomSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import {useAppSelector} from "../hooks/hooks";
import {AppStatus} from "../store/app-reducer";

type PropsType = {
    demo?: boolean
}

const App = ({demo = false, ...props}: PropsType) => {
    console.log('i am App component')
    const {status} = useAppSelector(state => state.app)

    return (
        <>
            <Header/>
            {status === AppStatus.progress && <LinearProgress color="secondary"/>}
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
            <CustomSnackbar/>
        </>
    );
}

export default App;


