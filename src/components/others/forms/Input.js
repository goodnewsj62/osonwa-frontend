import { memo, useRef, useState } from "react";
import styles from "./styles/element.module.css";




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




    const highlightArea = (e) => {
        e.target.readOnly = false;
        e.target.classList.add(`${styles.highlight}`);
        focusFunc(e);
    };

    const unHighlightArea = (e) => {
        e.target.classList.remove(`${styles.highlight}`);
        blurFunc(e);
    };


    return (
        <input readOnly={true}
            ref={inputRef}
            type={type}
            name={name}
            value={value}
            onFocus={highlightArea}
            onBlur={unHighlightArea}
            onChange={changeFunc}
            className={classNames}
        />
    )
}

export default memo(Input);