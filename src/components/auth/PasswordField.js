import { useState } from "react";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from "../styles/loginform.module.css";
import Input from "../Input";


export default function PasswordField({ dispatch, fieldVal }) {
    const [message, setMessage] = useState({ message: "", strenght: "" });
    const [passShow, setPassShow] = useState(false);
    const [touched, setTouched] = useState(false);
    const iconSize = 20


    const togglePasswordVisibility = (event, value) => {
        if (value === "show") {
            // input.type =  "text";
            setPassShow(true);
        } else {
            setPassShow(false);
        }
    };

    const blurHandler = (event) => { setTouched(true); passwordValidator(event, dispatch, setMessage) };
    const changeHandler = (event) => { passwordValidator(event, dispatch, setMessage) };
    const inputErrorStyle = !fieldVal.isValid && touched ? `${styles.fullerror__highlight}` : "";
    let textHighlight;

    const barStyles = `${styles.bar} ${styles[message.strenght]}`;
    const moveUp = message.strenght ? styles.move_up : "";

    const inputCompParams = {
        type: "password",
        classNames: inputErrorStyle,
        blurFunc: blurHandler,
        changeFunc: changeHandler,
        value: fieldVal.content,
        name: "password"
    }



    if (message.strenght === "strong") textHighlight = styles.highlight__strong;
    else if (message.strenght === "fair") textHighlight = styles.highlight__fair;
    else textHighlight = styles.highlight__poor


    return (
        <div className={`${styles.form__div} ${styles.password__div}`}>
            <label htmlFor="password">
                Password
            </label>
            {passShow ? <Input params={{ ...inputCompParams, type: "text" }} /> : <Input params={inputCompParams} />}
            <div className={moveUp}>
                {
                    passShow ?
                        <span onClick={(e) => togglePasswordVisibility(e, "hide")}>
                            <AiOutlineEye size={iconSize} />
                        </span> :
                        <span onClick={(e) => togglePasswordVisibility(e, "show")}>
                            <AiFillEyeInvisible size={iconSize} />
                        </span>
                }
            </div>
            <span className={styles.strength}>
                <div className={styles.groove}>
                    <div className={barStyles}></div>
                </div>
                <span className={`${textHighlight}`}>
                    {message.strenght}
                </span>
            </span>

            <span className={`${styles.message} ${textHighlight}`}>
                {message.message}
            </span>
        </div>
    )
};


const passwordValidator = (event, dispatch, setMessage) => {
    const trimmedValue = event.target.value.trim();
    const value = event.target.value;
    const hasWhiteSpace = value.includes(" ")

    const alphaNumeric = /\d/.test(trimmedValue);
    let specialChar = false;

    Array.from("!@#$%^&*").forEach((char) => {

        if (value.includes(char)) {
            specialChar = true;
            return
        }
    });


    dispatch({ type: "password", payload: { content: value } });


    if (trimmedValue.length < 8) {
        setMessage({ strenght: "poor", message: "password length too short" });
        dispatch({ type: "password", payload: { isValid: false } });
        return
    }

    if (hasWhiteSpace) {
        setMessage({ strenght: "poor", message: "password should not contain spaces" });
        dispatch({ type: "password", payload: { isValid: false } });
        return
    }

    if (alphaNumeric && specialChar) {
        setMessage({ strenght: "strong", message: "" });
        dispatch({ type: "password", payload: { isValid: true } });
    } else if (specialChar) {
        setMessage({ strenght: "fair", message: "add numbers to make your password stronger" });
        dispatch({ type: "password", payload: { isValid: true } });
    }
    else if (alphaNumeric) {
        setMessage({ strenght: "fair", message: "add special characters for a stronger password" });
        dispatch({ type: "password", payload: { isValid: true } });
    }
    else {
        setMessage({ strenght: "poor", message: "add special charaters and numbers" });
        dispatch({ type: "password", payload: { isValid: true } });
    }

}