import {  useRef } from "react";
import styles from "./styles/loginform.module.css";




const Input = ({ params }) => {
    const inputRef = useRef();
    const dummyFunc =   (e)=>null;
    const {
            blurFunc = dummyFunc, 
            type,  
            focusFunc =dummyFunc, 
            changeFunc=  dummyFunc,
            value,
            name= "",
            classNames="",
        }= params ;




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

    if(value){
        return (
            <input readOnly={true}  
                ref={inputRef} 
                type={type}  
                name= {name} 
                value= {value}
                onFocus={moveLabelUpAndMakeWritable} 
                onBlur={moveLabelUpOrDown} 
                onChange= {changeFunc}
                className= {classNames}
            />
        );
    }else{
        return (
            <input readOnly={true}  
                ref={inputRef} 
                type={type}  
                name= {name} 
                onFocus={moveLabelUpAndMakeWritable} 
                onBlur={moveLabelUpOrDown} 
                onChange= {changeFunc}
                className= {classNames}
            />
        )
    }
}

export default Input;