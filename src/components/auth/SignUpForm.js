import { useEffect, useReducer, useState } from "react";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import UserNameField from "./authUtils/UsernameInput";
import Input from "./Input";
import styles from "./styles/loginform.module.css";

const dS = () => { return { content: "", isValid: false, error: "" } };
const initialState = { username: dS(), email: dS(), password: dS(), firstName: dS(), lastName: dS() }

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
    const [passShow, setPassShow] = useState(false);
    const [formIsValid, setFormValidState] = useState(false);
    const [userInputs, dispatch] = useReducer(signupReducer, initialState)

    const togglePasswordVisibility = (event, value) => {
        if (value === "show") {
            // input.type =  "text";
            setPassShow(true);
        } else {
            setPassShow(false);
        }
    };


    useEffect(() => {

    }, []);


    const submitHandler = (event) => {
        event.preventDefault();
    };

    const iconSize = 20;
    return (
        <form className={styles.form}>
            <UserNameField dispatch={dispatch} fieldVal={userInputs.username} />

            <div className={`${styles.form__div}`}>
                <label htmlFor="email">
                    Email
                </label>
                <Input params={{ type: "email" }} />
            </div>
            <div className={`${styles.form__div}`}>
                <label htmlFor="first__name">
                    Firstname
                </label>
                <Input params={{ type: "text" }} />
            </div>
            <div className={`${styles.form__div}`}>
                <label htmlFor="last__name">
                    Lastname
                </label>
                <Input params={{ type: "text" }} />
            </div>
            <div className={`${styles.form__div} ${styles.password__div}`}>
                <label htmlFor="password">
                    Password
                </label>
                {passShow ? <Input params={{ type: "text" }} /> : <Input params={{ type: "password" }} />}
                <div>
                    {
                        passShow ?
                            <span onClick={(e) => togglePasswordVisibility(e, "hide")} className={`${styles.open__eye}`}>
                                <AiOutlineEye size={iconSize} />
                            </span> :
                            <span onClick={(e) => togglePasswordVisibility(e, "show")} className={`${styles.close__eye}`}>
                                <AiFillEyeInvisible size={iconSize} />
                            </span>
                    }
                </div>
            </div>
            <div className={`${styles.form__div} ${styles.password__div}`}>
                <label htmlFor="confirm__password">
                    Comfirm Password
                </label>
                <Input params={{ type: "password" }} />
            </div>
            <div className={styles.submit}>
                <button type="submit">
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