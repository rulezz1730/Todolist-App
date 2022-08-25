import {sum, sub, div, mult, salaryReducer, ActionType} from "./example";

//1. Тестовые данные:
const salary: number = 800;
const n: number = 200;
const divN: number = 100;
const convertN: number = 62;
const state: number = 800;


test('sum function check ', () => {
    //2. Выполнение тестируемого кода
    const result = sum(salary, n)

    //3.Проверка результата
    expect(result).toBe(1000)
})

test('sub function check', () => {
    //3.Проверка результата
    expect(sub(salary, n)).toBe(600)
})

test("div function check", () => {
    expect(div(salary, divN)).toBe(8)
})

test('conversion function check', () => {
    expect(mult(salary, convertN)).toBe(49600)
})


test('testing salaryReducer', () => {

    // const result = salaryReducer(salary, {type: "SUM", n})
    const action: ActionType = {
        type: 'TEST',
        n: convertN
    }

    expect(salaryReducer(state, {type: "SUM", n})).toBe(1000)
    expect(salaryReducer(state, {type: "SUB", n})).toBe(600)
    expect(salaryReducer(state, {type: "DIV", n: divN})).toBe(8)
    expect(salaryReducer(state, {type: "MULT", n: convertN})).toBe(49600)
    expect(salaryReducer(state, action)).toBe(state)

})