import React, {useState} from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import Task from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../../api-services/http.service";


// const changeCheckTaskCallback = action('Change Check Task Status called ');
// const changeTaskTitleCallback = action('Change Task Title called ');
const removeTaskCallBack = action("Remove Task called ");

export default {
    title: "TODOLIST/Task Story",
    component: Task,
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({
        id: "1",
        todoListId: 'todolist1',
        title: "JavaScript",
        description: "",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
    })

    const onChangeCheckTask = () => {
        setTask(prevState => ({...task, status: TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New}))
    }

    const onChangeTaskTitleHandler = (newTitle: string, taskId: string) => {
        setTask(prevState => ({...task, title: newTitle}))
    }

    // const onRemoveTask = (taskId: string, todoListID: string) => {
    //     removeTaskCallBack()
    // }


    return <Task {...args}
                 task={task}
                 todoListID={'todolist1'}
                 filter={'all'}
                 onChangeCheckTask={onChangeCheckTask}
                 onChangeTaskTitleHandler={onChangeTaskTitleHandler}
        // onRemoveTask={onRemoveTask}
    />
}

export const TaskIsDoneStory = Template.bind({})

TaskIsDoneStory.args = {
    onRemoveTask: removeTaskCallBack,
}

// export const TaskIsNotDoneStory = Template.bind({})
//
// TaskIsNotDoneStory.args = {
//     // task: {id:"2", title:"React", isDone: false},
// }


//
// export const TaskBaseExample = (props: any) => {
//     return <>
//         <Task task={{id:"1", title:"JS", isDone: true}}
//               onChangeCheckTask={changeCheckTaskCallback}
//               onChangeTaskTitleHandler={changeTaskTitleCallback}
//               onRemoveTask={removeTaskCallBack}
//               todoListID={'todolist1'}
//               filter={"all"}/>
//         <Task task={{id:"2", title:"React", isDone: false}}
//               onChangeCheckTask={changeCheckTaskCallback}
//               onChangeTaskTitleHandler={changeTaskTitleCallback}
//               onRemoveTask={removeTaskCallBack}
//               todoListID={'todolist2'}
//               filter={"all"}/>
//     </>
// }