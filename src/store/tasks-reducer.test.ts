import {createTaskAC, removeTaskAC, setTasksAC, tasksReducer, updateTaskAC} from "./tasks-reducer";
import {TasksStateType} from "../AppWithRedux";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api-services/http.service";

let tasks: TasksStateType;

beforeEach(() => {
    tasks = {
        "todoListID_1": [
            {
                id: "1", title: "CSS", todoListId: 'todoListID_1', description: "", status: TaskStatuses.Completed,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
            {
                id: "2", title: "JS", todoListId: 'todoListID_1', description: "", status: TaskStatuses.Completed,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
            {
                id: "3", title: "REACT", todoListId: 'todoListID_1', description: "", status: TaskStatuses.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
            {
                id: "4", title: "Redux", todoListId: 'todoListID_1', description: "", status: TaskStatuses.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
            {
                id: "5", title: "GraphQL", todoListId: 'todoListID_1', description: "", status: TaskStatuses.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            }
        ],
        "todoListID_2": [
            {
                id: "1", title: "A", todoListId: 'todoListID_2', description: "", status: TaskStatuses.Completed,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
            {
                id: "2", title: "B", todoListId: 'todoListID_2', description: "", status: TaskStatuses.Completed,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
            {
                id: "3", title: "C", todoListId: 'todoListID_2', description: "", status: TaskStatuses.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
            {
                id: "4", title: "D", todoListId: 'todoListID_2', description: "", status: TaskStatuses.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
            {
                id: "5", title: "E", todoListId: 'todoListID_2', description: "", status: TaskStatuses.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
        ]
    }
})


test('testing REMOVE-TASK action with tasksReducer', () => {

    const action = removeTaskAC("2", "todoListID_2");


    const endState = tasksReducer(tasks, action);
    const state = tasksReducer(tasks, removeTaskAC('1', "todoListID_1"));
    const state1 = tasksReducer(tasks, removeTaskAC('5', "todoListID_2"));
    const state2 = tasksReducer(tasks, removeTaskAC('3', "todoListID_2"));


    expect(endState).toEqual({
        "todoListID_1": [
            {
                id: "1", title: "CSS", todoListId: 'todoListID_1', description: "", status: TaskStatuses.Completed,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
            {
                id: "2", title: "JS", todoListId: 'todoListID_1', description: "", status: TaskStatuses.Completed,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
            {
                id: "3", title: "REACT", todoListId: 'todoListID_1', description: "", status: TaskStatuses.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
            {
                id: "4", title: "Redux", todoListId: 'todoListID_1', description: "", status: TaskStatuses.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
            {
                id: "5", title: "GraphQL", todoListId: 'todoListID_1', description: "", status: TaskStatuses.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            }
        ],
        "todoListID_2": [
            {
                id: "1", title: "A", todoListId: 'todoListID_2', description: "", status: TaskStatuses.Completed,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
            {
                id: "3", title: "C", todoListId: 'todoListID_2', description: "", status: TaskStatuses.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
            {
                id: "4", title: "D", todoListId: 'todoListID_2', description: "", status: TaskStatuses.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
            {
                id: "5", title: "E", todoListId: 'todoListID_2', description: "", status: TaskStatuses.New,
                priority: TaskPriorities.Low, startDate: '', deadline: '', order: 0, addedDate: '',
            },
        ]
    })

    expect(endState["todoListID_1"].length).toBe(5);
    expect(endState["todoListID_2"].length).toBe(4);
    expect(endState["todoListID_2"].every(el => el.id !== "2")).toBeTruthy();
    expect(endState["todoListID_2"][0].id).toBe('1');
    expect(endState["todoListID_2"][1].id).toBe('3');


    expect(state["todoListID_1"].length).toBe(4);
    expect(state["todoListID_1"][0].id).toBe(tasks["todoListID_1"][1].id);
    expect(state["todoListID_1"][0].id).toBe('2');
    expect(state["todoListID_1"].every(el => el.id !== "1")).toBe(true);
    expect(state1["todoListID_2"].length).toBe(4);
    expect(state2["todoListID_2"].every(el => el.id !== "3")).toBe(true);
})

test('testing ADD-TASK action with tasksReducer', () => {

    const action = createTaskAC({
        id: "5",
        todoListId: "todoListID_1",
        title: "React-Redux",
        description: "",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
    });

    const endState = tasksReducer(tasks, action);
    const endState2 = tasksReducer(tasks, createTaskAC({
        id: "5",
        title: "F",
        todoListId: "todoListID_2",
        description: "",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
    }));


    expect(endState["todoListID_1"].length).toBe(6);
    expect(endState["todoListID_1"][0].title).toBe("React-Redux");
    expect(endState["todoListID_1"][0].id).toBeDefined();
    expect(endState["todoListID_1"][0].status).toBe(TaskStatuses.New);

    expect(endState2["todoListID_2"].length).toBe(6);
    expect(endState2["todoListID_2"][0].title).toBe("F");
    expect(endState2["todoListID_2"][0].id).toBeDefined();
    expect(endState2["todoListID_2"][0].status).toBe(TaskStatuses.New);
})

test('testing CHANGE-TASK-STATUS action with tasksReducer', () => {


    let action = updateTaskAC("5", "todoListID_1", {status: TaskStatuses.Completed})
    const endState = tasksReducer(tasks, action)
    const endState1 = tasksReducer(tasks, updateTaskAC("1", "todoListID_2", {status: TaskStatuses.New}))


    expect(endState["todoListID_1"][4].status).toBe(TaskStatuses.Completed)
    expect(endState["todoListID_2"][4].status).toBe(TaskStatuses.New)

    expect(endState1["todoListID_2"][0].status).toBe(TaskStatuses.New)
    expect(endState1["todoListID_1"][0].status).toBe(TaskStatuses.Completed)

})

test('testing UPDATE_TASK action with tasksReducer', () => {
    const action = updateTaskAC('3', "todoListID_1", {title:"REACT-JS"});

    const endState = tasksReducer(tasks, action);
    const endState2 = tasksReducer(tasks, updateTaskAC('2', "todoListID_2", {title: "Z"}));

    expect(endState["todoListID_1"][2].title).toBe('REACT-JS');
    expect(endState["todoListID_1"][0].title).toBe('CSS');
    expect(endState["todoListID_1"][1].title).toBe('JS');
    expect(endState["todoListID_2"][2].title).toBe('C');


    expect(endState2["todoListID_2"][1].title).toBe("Z");
    expect(endState2["todoListID_2"][0].title).toBe("A");
    expect(endState2["todoListID_2"][2].title).toBe("C");
    expect(endState2["todoListID_1"][1].title).toBe("JS");
})

test('testing new property with new array should be added when new todoList added',
    () => {

        const action = addTodolistAC({id: 'NewTodoList', title: 'What to learning', addedDate: '', order: 0});
        const endState = tasksReducer(tasks, action);

        const keys = Object.keys(endState);

        const newKey = keys.find(k => k !== "todoListID_1" && k !== "todoListID_2");
        if (!newKey) {
            throw new Error("new key should be added!")
        }

        expect(keys.length).toBe(3);
        expect(endState[newKey]).toEqual([]);
    })

test('Testing property with todolistId should be deleted ', () => {

    const action = removeTodolistAC("todoListID_1");
    const endState = tasksReducer(tasks, action);
    const keys = Object.keys(endState);


    expect(keys.length).toBe(1);
    expect(!endState.hasOwnProperty("todoListID_1")).toBeTruthy();
    expect(endState["todoListID_1"]).toBeUndefined();
    expect(keys[0]).toBe("todoListID_2");

})

test("Tasks should be added to Todolist", () => {
    const action = setTasksAC("tl1", [])
    const endState = tasksReducer(tasks, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(3)
    expect(keys.some(el => el === "tl1")).toBeTruthy()
    expect(endState['tl1']).toStrictEqual([])
})