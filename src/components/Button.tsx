import React from 'react';


type ButtonPropsType = {
    name: string;
    callBack: () => void;
    color?: string
}

const UniversalButton: React.FC<ButtonPropsType> = ({name, callBack, color}) => {
    const onClickHanlder  = () => callBack();

    return (
        <>
            <button className={color} onClick={onClickHanlder}>{name}</button>
        </>
    );
};

export default UniversalButton;

