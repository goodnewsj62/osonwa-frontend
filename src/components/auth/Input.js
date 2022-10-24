import {  useRef } from "react";
import styles from "./styles/loginform.module.css";




const Input = ({ type }) => {
    const inputRef = useRef();


    const moveLabelUpAndMakeWritable = (e) => {
        e.target.readOnly = false;
        e.target.previousSibling.classList.add(`${styles.move__up}`);
    };

    const moveLabelUpOrDown = (e) => {
        if (!e.target.value) {
            e.target.previousSibling.classList.remove(`${styles.move__up}`);
        } else {
            e.target.previousSibling.classList.add(`${styles.move__up}`);
        }
    };

    return (
        <input readOnly={true}  ref={inputRef} type={type}  onFocus={moveLabelUpAndMakeWritable} onBlur={moveLabelUpOrDown} />
    );
}

export default Input;