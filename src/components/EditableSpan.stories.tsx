import React, {useState} from "react";
import EditableSpan from "./EditableSpan";
import {ComponentMeta,ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: "TODOLIST/EditableSpan Component Story",
    component: EditableSpan
} as ComponentMeta<typeof EditableSpan>


const onChangeTitleCallback = action('im refactor title of todolist or task')

const Template:ComponentStory<typeof EditableSpan> = (args) => {
    const [title, setTitle] = useState<string>('Start value')

    const handleChangeTitle = (value:string, tId:string) => {
        onChangeTitleCallback()
        setTitle(value)
    }

    return <EditableSpan
        {...args}
        // title={title}
        onChange={handleChangeTitle}
        tId={'todoList1'}
    />
}

export const EditableSpanStory = Template.bind({})

EditableSpanStory.args ={
    title: 'Title'
}


// export const EditableSpanBaseExample = (props: any) => {
//     return <EditableSpan title={"Start value"}
//                          onChange={onChangeTitleCallback}
//                          tId={'todoList1'}/>
// }