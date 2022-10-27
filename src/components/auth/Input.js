import { useRef, useState } from "react";
import styles from "./styles/loginform.module.css";




const Input = ({ params }) => {
    const inputRef = useRef();
    const [val, setVal] = useState("");


    const dummyFunc = (e) => null;
    const changeHandler = (e) => setVal(e.target.value);
    const {
        blurFunc = dummyFunc,
        type,
        focusFunc = dummyFunc,
        changeFunc = changeHandler,
        value = val,
        name = "",
        classNames = "",
    } = params;




    const moveLabelUpAndMakeWritable = (e) => {
        e.target.readOnly = false;
        e.target.previousSibling.classList.add(`${styles.move__up}`);
        focusFunc(e);
    };

    const moveLabelUpOrDown = (e) => {
        if (!e.target.value) {
            e.target.previousSibling.classList.remove(`${styles.move__up}`);
        } else {
            e.target.previousSibling.classList.add(`${styles.move__up}`);
        }
        blurFunc(e);
    };


    return (
        <input readOnly={true}
            ref={inputRef}
            type={type}
            name={name}
            value={value}
            onFocus={moveLabelUpAndMakeWritable}
            onBlur={moveLabelUpOrDown}
            onChange={changeFunc}
            className={classNames}
        />
    )
}

export default Input;