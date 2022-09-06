import {
    addTodolistAC,
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    FilterType,
    removeTodolistAC,
    setTodolistsAC,
    TodolistDomainType,
    todolistsReducer,
    updateTodolistTitleAC,
} from "./todolists-reducer";
import {v1 as uuidv1} from "uuid";
import {AppStatus} from "./app-reducer";

let todoListId1: string;
let todoListId2: string;
let startState: Array<TodolistDomainType>;

beforeEach(() => {
    todoListId1 = uuidv1();
    todoListId2 = uuidv1();
    startState = [
        {id: todoListId1, title: 'What to learning', filter: "all", addedDate: '', order: 0, entityStatus: AppStatus.idle},
        {id: todoListId2, title: 'What to buy', filter: "all", addedDate: '', order: 0, entityStatus: AppStatus.idle},
    ]
})


test(`testing "REMOVE-TODOLIST" action with todolistsReducer`, () => {

    const endState: Array<TodolistDomainType> = todolistsReducer(startState, removeTodolistAC(todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
})

test(`testing "ADD-TODO" action.type with todolistsReducer`, () => {
    const todolist = {
        id: 'New todoList',
        title: 'Testing title',
        addedDate: '',
        order: 0}

    const endState = todolistsReducer(startState, addTodolistAC(todolist));

    expect(endState[0].title).toBe('Testing title');
    expect(endState[0].filter).toBe('all');
    expect(endState.length).toBe(3);
    expect(endState[1]).toEqual(startState[0])
    expect(endState[2]).toEqual(startState[1])
})


test(`correct change title with 'CHANGE-TODOLIST-TITLE' action.type with todolistsReducer`,
    () => {
        const newTitle: string = 'New Title';

        const endState = todolistsReducer(startState, updateTodolistTitleAC(newTitle, todoListId1));

        expect(endState[0].title).toBe(newTitle);
        expect(endState[0].id).toBe(todoListId1);
        expect(endState[0].filter).toBe('all');
        expect(endState.length).toBe(2);
        expect(endState[1].title).toBe("What to buy");
        expect(endState[1].id).toBe(todoListId2);
        expect(endState[1].filter).toBe('all');
    })

test(`correct change title with 'CHANGE-TODOLIST-FILTER' action.type with todolistsReducer`, () => {

        const newFilter: FilterType = 'complete';

        const action = changeTodolistFilterAC("active", todoListId2);

        const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter, todoListId1));
        const endState2 = todolistsReducer(startState, action);

        expect(endState[0].filter).toBe(newFilter);
        expect(endState2[1].filter).toBe('active');

    })

test('Correct get Todolists from server side', () => {
    // const action = setTodolistsAC([{id: 'todolist3', title: 'What to learning', addedDate: '', order: 0},])
    const action = setTodolistsAC(startState)

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to learning')
    expect(endState[1].filter).toBe('all')
})

test('Correct entityStatus todolist should be changed', () => {
    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todoListId1, AppStatus.progress))

    expect(endState[0].entityStatus).toBe(AppStatus.progress)
    expect(endState[1].entityStatus).toBe(AppStatus.idle)
})