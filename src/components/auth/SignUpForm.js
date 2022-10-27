import { useCallback, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import ComfirmPasswordField from "./authUtils/ComfirmPassword";
import EmailField from "./authUtils/EmailField";
import NamedField from "./authUtils/NameField";
import PasswordField from "./authUtils/PasswordField";
import UserNameField from "./authUtils/UsernameInput";
import styles from "./styles/loginform.module.css";

const dS = () => { return { content: "", isValid: false, error: "" } };
const initialState = { username: dS(), email: dS(), password: dS(), comfirmPass: dS(), firstName: dS(), lastName: dS() }

const signupReducer = (state, action) => {
    const keys = Object.keys(state);
    for (let key of keys) {
        if (key === action.type) {
            const payload = { ...state[key], ...action.payload };
            return { ...state, [key]: payload }
        }
    }

    return state;
};


export default function SignUpForm({ switchForm }) {
    const [formIsValid, setFormValidState] = useState(false);
    const [userInputs, dispatch] = useReducer(signupReducer, initialState);


    const isValid = useCallback(() => Object.values(userInputs).every((value) => value.isValid === true), [userInputs])

    useEffect(() => {
        if (isValid()) {
            setFormValidState(true);
        } else {
            setFormValidState(false);
        }
    }, [userInputs, isValid]);


    const submitHandler = (event) => {
        event.preventDefault();
        if (isValid()) {

        }
    };

    return (
        <form onSubmit={submitHandler} className={styles.form}>
            <UserNameField dispatch={dispatch} fieldVal={userInputs.username} />
            <EmailField dispatch={dispatch} fieldVal={userInputs.email} />
            <NamedField dispatch={dispatch} fieldVal={userInputs.firstName} label={"Firstname"} type={"firstName"} />
            <NamedField dispatch={dispatch} fieldVal={userInputs.lastName} label={"Lastname"} type={"lastName"} />
            <PasswordField dispatch={dispatch} fieldVal={userInputs.password} />

            <ComfirmPasswordField dispatch={dispatch} fieldVal={userInputs.comfirmPass} passwordVal={userInputs.password} />
            <div className={styles.submit}>
                <button disabled={!formIsValid} type="submit">
                    Sign Up
                </button>
            </div>
            <div className={`${styles.other__links}`}>
                <Link to="/login" >
                    already got an account? sign in
                </Link>
            </div>
        </form>
    );
};