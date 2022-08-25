export const sum = (salary: number, n: number): number => salary + n;
export const sub = (salary: number, n: number): number => salary - n;
export const div = (salary: number, n: number): number => salary / n;
export const mult = (salary: number, n: number): number => salary * n;

export type ActionType = {
    type: "SUM" | "SUB" | "DIV" | "MULT" | "TEST";
    n: number;
}

type StateType = number;

export const salaryReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "SUM":
            return state + action.n
        case "SUB":
            return state - action.n
        case "DIV":
            return state / action.n
        case "MULT":
            return state * action.n
        default:
            return state
    }
}