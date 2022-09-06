import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppSelector, useAppThunkDispatch} from "../../hooks/hooks";
import {setAppErrorTC} from "../../store/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomErrorSnackbar() {
    const {error, status} = useAppSelector(state => state.app)
    const dispatch = useAppThunkDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorTC(null));
    };

    return (
            <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
    );
}