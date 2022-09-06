import {appReducer, AppStatus, InitialAppStateType, setAppStatusAC, setAppErrorAC} from "./app-reducer";

let appState: InitialAppStateType;

beforeEach(() => {
    appState = {
        error: null,
        status: AppStatus.idle
    }
})


test('Test error shoul be setted with appReducer (APP/SET_ERROR action creator)', () => {
    const errorMessage = "An unexpected error occurred"
    const endState = appReducer(appState, setAppErrorAC(errorMessage));
    expect(endState.error).toBe(errorMessage)
})


test('Test app status shoul be changed with appReducer (APP/SET_STATUS action creator)', () => {
    const endState = appReducer(appState, setAppStatusAC(AppStatus.progress));
    expect(endState.status).toBe(AppStatus.progress)
})
