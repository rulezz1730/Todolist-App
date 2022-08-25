import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";

type CheckBoxPropsType = {
    checked:boolean;
    taskId:string;
    callBack:(taskId: string, checkedValue:boolean) => void;
}

const CheckBox:React.FC<CheckBoxPropsType> = React.memo(({checked, callBack, taskId}) => {
    console.log('im a checkbox '+ taskId)

    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        callBack(taskId, event.currentTarget.checked)
    }

    return (
        <>
            <Checkbox color="success" checked={checked} onChange={onChangeHandler}/>
        </>

    );
});

export default CheckBox;