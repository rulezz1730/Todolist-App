export type StateType = {
    age: number;
    childrenCount: number;
    name: string;
}

export type ActionType = {
    type: "INCREMENT-AGE" | "INCREMENT-CHILDREN-COUNT" | "CHANGE-NAME";
    [key: string]: any;
}

export const userReduser = (state: StateType, action: ActionType): StateType => {
    switch (action.type){
        case "INCREMENT-AGE":
            return {...state, age: state.age + 1 };
        case "INCREMENT-CHILDREN-COUNT":
            return {...state, childrenCount: state.childrenCount + 1 };
        case "CHANGE-NAME":
            return {...state, name: action.newName };
        default:
            throw new Error("I dont know this action type.")
    }
}