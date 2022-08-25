import React from "react";
import AppWithRedux from "./AppWithRedux";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "./store/ReduxStoreProviderDecorator";

export default {
    title: "TODOLIST/AppWithRedux Copmonent Story",
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>


const Template: ComponentStory<typeof AppWithRedux> = (agrs) => <AppWithRedux/>


export const AppWithReduxStory = Template.bind({})

AppWithReduxStory.args = {}
