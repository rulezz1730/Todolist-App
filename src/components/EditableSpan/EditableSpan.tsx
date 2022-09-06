import React, {useState, ChangeEvent, useCallback} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string;
    onChange: (newValue: string, tId: string) => void;
    tId: string
}

const EditableSpan = React.memo(({title, onChange, tId}: EditableSpanPropsType) => {
    console.log("editable span " + title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(title)

    const activateEditMode = useCallback((): void => {
        setEditMode(true)
    },[setEditMode])

    const deactivateEditMode = useCallback((): void => {
        setEditMode(false);
        onChange(value, tId);
    },[onChange,value,tId])

    const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        setValue(e.currentTarget.value)
    },[setValue])

    return editMode
        ? <TextField id="outlined-basic"
                     size={"small"}
                     label="Outlined"
                     variant="outlined"
                     value={value}
                     onChange={handleChangeInput}
                     onBlur={deactivateEditMode}
                     autoFocus/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
})

export default EditableSpan;