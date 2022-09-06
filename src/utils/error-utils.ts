import {AppDispatch} from "../store/store";
import {ResponseTodolistType} from "../api-services/http.service";
import {AppStatus, setAppErrorAC, setAppStatusAC} from "../store/app-reducer";


export const handleServerAppError = <D>(data:ResponseTodolistType<D>, dispatch: AppDispatch  ) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC(AppStatus.failed))
}

export const handleNetworkAppError = (err: { message: any }, dispatch: AppDispatch) => {
    dispatch(setAppStatusAC(AppStatus.failed))
    dispatch(setAppErrorAC(err.message ? err.message : "Some Network Error"))
}
