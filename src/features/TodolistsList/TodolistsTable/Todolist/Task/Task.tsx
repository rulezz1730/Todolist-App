import React from "react";
import CheckBox from "../../../../../components/Checkbox/CheckBox";
import EditableSpan from "../../../../../components/EditableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from '../../../../../index.module.css';
import {FilterType} from "../../../../../store/todolists-reducer";
import {TaskStatuses, TaskType} from "../../../../../api-services/http.service";


type TaskPropsType = {
    task: TaskType,
    onChangeCheckTask: (taskId: string, checkedValue: boolean) => void,
    onChangeTaskTitleHandler: (newTitle: string, taskId: string) => void,
    onRemoveTask: (taskId: string, todoListID: string) => void,
    todoListID: string,
    filter: FilterType

}

const Task = React.memo(({
                             task,
                             onChangeCheckTask,
                             onChangeTaskTitleHandler,
                             todoListID,
                             onRemoveTask,
                             filter
                         }: TaskPropsType) => {

console.log('im a task ', task.id)
    return (
        <div key={task.id}
             className={task.status===TaskStatuses.Completed ? styles.todoElement + " " + styles.isDone : styles.todoElement}>
            <div>
                <CheckBox checked={task.status === TaskStatuses.Completed }
                          callBack={onChangeCheckTask}
                          taskId={task.id}
                />
                <EditableSpan title={task.title} onChange={onChangeTaskTitleHandler} tId={task.id}/>

            </div>

            <IconButton aria-label="delete" color={'error'} onClick={() => onRemoveTask(task.id, todoListID)}>
                <HighlightOffIcon/>
            </IconButton>
        </div>
    )
})

export default Task;