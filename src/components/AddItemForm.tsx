import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import styles from '../index.module.css'
import '../App.css'

export  type AddItemFormPropsType = {
    addItem: (title: string) => void;
}

export type NewTitlePropsType = string;

const AddItemForm = React.memo(({addItem}: AddItemFormPropsType) => {
    console.log('AddItemForm was called')
    const [newTaskTitle, setNewTaskTitle] = useState<NewTitlePropsType>('')
    const [error, setError] = useState<string | null>(null)


    const onChangeNewTitle = (e: ChangeEvent<HTMLInputElement>): void => {
        setError('');
        setNewTaskTitle(e.currentTarget.value);
    }

    const onHandleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        error !== null && error !== '' && setError("")
        //Possible use e.charCode, but React say is old solution
        e.ctrlKey && e.key === "Enter" && onClickAddItem();
    }

    const onClickAddItem = useCallback(() : void => {
        const trimmedNewTaskTitle = newTaskTitle.trim();
        if (trimmedNewTaskTitle !== '') {
            addItem(trimmedNewTaskTitle);
            setNewTaskTitle('');
        } else {
            setError("Title is required")
        }
    },[newTaskTitle, addItem])

    return (
        <div>
            <div className={styles.inputBlock}>
                <TextField id="outlined-basic"
                           size={"small"}
                           label="Title"
                           variant="outlined"
                           value={newTaskTitle}
                           onChange={onChangeNewTitle}
                           onKeyPress={onHandleKeyPress}
                           error={!!error}
                           helperText={error}
                />
                <IconButton aria-label="delete" color={'success'} size="small" onClick={onClickAddItem}>
                    <AddIcon/>
                </IconButton>
            </div>
        </div>)
})

export default AddItemForm;