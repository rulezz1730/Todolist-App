import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType, AppThunkDispatch} from "../store/store";


export const useAppThunkDispatch: () =>  AppThunkDispatch = useDispatch
export const useAppDispatch : () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector