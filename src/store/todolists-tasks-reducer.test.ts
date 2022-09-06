
import {
    addTodolistAC,
    setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {TodolistType} from "../api-services/http.service";


test("it should be equal", () => {
    const startTasksState: TasksStateType = {}

    const startTodoListsState: Array<TodolistDomainType> = [];

    const objFroAction:TodolistType  = {
        id: '1',
        addedDate: '12.08.2022',
        order: 0,
        title: 'Change Title',
    }
    const action = addTodolistAC(objFroAction);

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodoListsState = todolistsReducer(startTodoListsState, action);

    const keys = Object.keys(endTasksState);

    expect(endTodoListsState[0].id).toBe("1");
    expect(keys[0]).toBe("1");

})

test('Empty array shoud be added when todolists recieves and sets', () => {
    const action = setTodolistsAC([
        {id: 'todoListId1', title: 'What to learning', addedDate: '', order: 0},
        {id: 'todoListId2', title: 'What to buy', addedDate: '', order: 0},
    ])

    const endState = tasksReducer({}, action);

    const keysOfEndState = Object.keys(endState);

    expect(keysOfEndState.length).toBe(2);
    expect(keysOfEndState[0]).toBe('todoListId1');
    expect(keysOfEndState[2]).toBe(undefined);
    expect(endState['todoListId1']).toEqual([])
    expect(endState['todoListId2']).toStrictEqual([])
})