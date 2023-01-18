import { useCallback, useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticateUserAndRedirect, axiosFormErrorHandler } from "utils/helpers";
import { baseAxiosInstance } from "utils/requests";
// import ComfirmPasswordField from "./authUtils/ComfirmPassword";
import EmailField from "./authUtils/EmailField";
import NamedField from "./authUtils/NameField";
// import PasswordField from "./authUtils/PasswordField";
import UserNameField from "./authUtils/UsernameInput";
import styles from "./styles/loginform.module.css";

const dS = () => { return { content: "", isValid: false, error: "" } };
const initialState = { username: dS(), email: dS(), firstName: dS(), lastName: dS() }

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


export default function SignUpForm({ email, cred, url, setErrorInfo }) {
    const [formIsValid, setFormValidState] = useState(false);
    const [userInputs, dispatch] = useReducer(signupReducer, initialState);
    const dispatch_ = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isValid = useCallback(() => Object.values(userInputs).every((value) => value.isValid === true), [userInputs]);

    useEffect(() => {
        if (isValid()) {
            setFormValidState(true);
        } else {
            setFormValidState(false);
        }
    }, [userInputs, isValid]);

    useEffect(() => {
        // the email needs to be filled up automatically on first render
        if (email) {
            dispatch({ type: "email", payload: { content: email, isValid: true } });
        }
    }, [email]);


    const getContent = (field) => {
        return userInputs[field].content;
    }


    const submitHandler = async (event) => {
        event.preventDefault();
        if (isValid()) {
            try {
                const data = { username: getContent("username"), email: getContent("email"), firstname: getContent("firstName"), lastname: getContent("lastName"), ...cred };
                const resp = await baseAxiosInstance.post(url, data);
                authenticateUserAndRedirect(resp.data.data, dispatch_, navigate, location.state);
            }
            catch (error) {
                console.log(error)
                axiosFormErrorHandler(error, Object.keys(userInputs), handleFieldError, handleGenError);
            }
        }
    };


    function handleFieldError(type, error) { dispatch({ type: type, payload: { isValid: false, error: error } }) };
    function handleGenError(error) { setErrorInfo({ state: true, message: error }) };




    return (
        <form onSubmit={submitHandler} className={`${styles.form} ${styles.grid__form}`}>
            <NamedField dispatch={dispatch} fieldVal={userInputs.firstName} label={"Firstname"} type={"firstName"} />
            <NamedField dispatch={dispatch} fieldVal={userInputs.lastName} label={"Lastname"} type={"lastName"} />
            <UserNameField dispatch={dispatch} fieldVal={userInputs.username} />
            <EmailField dispatch={dispatch} fieldVal={userInputs.email} />
            {/* <PasswordField dispatch={dispatch} fieldVal={userInputs.password} /> */}
            {/* <ComfirmPasswordField dispatch={dispatch} fieldVal={userInputs.comfirmPass} passwordVal={userInputs.password} /> */}
            <div className={styles.submit}>
                <button disabled={!formIsValid} type="submit">
                    Sign Up
                </button>
            </div>
            {/* <div className={`${styles.other__links}`}>
                <Link to="/login" >
                    already got an account? sign in
                </Link>
            </div> */}
        </form>
    );
};