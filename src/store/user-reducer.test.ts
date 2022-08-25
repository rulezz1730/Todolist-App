import {StateType, userReduser} from './user-reducer';

test('reducer should be increment only user age', () => {
    const startState: StateType = {age: 25, childrenCount: 1, name: 'Alex',}
    const endState = userReduser(startState, {type: "INCREMENT-AGE"});

    expect(endState.age).toBe(26)
    expect(endState.childrenCount).toBe(1)
    expect(endState.name).toBe('Alex')
})

test('reducer should be increment only user children count', () => {
    const startState: StateType = {age: 25, childrenCount: 1, name: 'Alex',}
    const endState = userReduser(startState, {type: "INCREMENT-CHILDREN-COUNT"});

    expect(endState.age).toBe(25)
    expect(endState.childrenCount).toBe(2)
    expect(endState.name).toBe('Alex')
})

test('reducer should be change only user name', () => {
    const startState: StateType = {age: 25, childrenCount: 1, name: 'Alex',}
    const newName = 'Evgeny'
    const endState = userReduser(startState, {type: "CHANGE-NAME", newName: newName});

    expect(endState.age).toBe(25)
    expect(endState.childrenCount).toBe(1)
    expect(endState.name).toBe(newName)
})