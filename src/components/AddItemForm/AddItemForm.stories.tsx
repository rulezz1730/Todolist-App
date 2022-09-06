import React from "react";
import {ComponentMeta,ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import AddItemForm from "./AddItemForm";

export default {
    title: 'TODOLIST/Add Item Form Story',
    component: AddItemForm,
    argTypes:{
        addItem: {
            description: "Clicked inside form"
        }
    }
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>

export const AddItemFormStory = Template.bind({})
const callback = action('Button "add" was pressed inside the form')

AddItemFormStory.args = {
    addItem: callback,
    disabled: false,
}

export const AddItemFormDisabledStory = Template.bind({})
AddItemFormDisabledStory.args ={
    addItem: callback,
    disabled: true,
}

// Variable to create story
// export const AddItemFormBaseExample = (props: any) => {
//     return  <AddItemForm addItem={callback} />
// }

// export const AddItemFormBaseExample = (props: any) => {
//     return <AddItemForm addItem={() => console.log('im changed')}/>
// }