import { useEffect, useState } from "react";
import { deBounce } from "utils/helpers";
import { baseAxiosInstance } from "utils/requests";
import styles from "../styles/loginform.module.css";
import DefaultField from "./DefaultField";




const UserNameField = ({ dispatch, fieldVal }) => {
    const [usernameExists, setUsernameExists] = useState(false);

    useEffect(() => {
        const validateUsername = deBounce(() => {
            baseAxiosInstance("auth/verify/username/", { params: { username: fieldVal.content } })
                .then((resp) => {
                    setUsernameExists(resp.data.data.status);
                });
        });

        validateUsername();

    }, [fieldVal.content, dispatch]);

    useEffect(() => {
        //set error if username does not exists
        if (usernameExists) {
            const payload = { isValid: false, error: "username has already been taken" };
            dispatch({ type: "username", payload: payload });
        }
    }, [usernameExists, dispatch]);



    const performErrorChecks = (trimmedValue, hasWhiteSpace, value) => {
        if (trimmedValue === "" || trimmedValue === " ") {
            const payload = { isValid: false, error: "this field is required" };
            dispatch({ type: "username", payload: payload });
        } else if (trimmedValue.length < 3) {
            const payload = { isValid: false, error: "username must be greater than two characters" };
            dispatch({ type: "username", payload: payload });
        } else if (hasWhiteSpace) {
            const payload = { isValid: false, error: "username cant contain spaces" };
            dispatch({ type: "username", payload: payload });
        } else {
            const payload = { isValid: true, error: "" };
            dispatch({ type: "username", payload: payload });
        }
    };


    const debounceErrorChecks = deBounce(performErrorChecks, 400);

    const userNameValidation = (event) => {
        const trimmedValue = event.target.value.trim();
        const value = event.target.value;
        const hasWhiteSpace = value.includes(" ");

        const payload = { content: value };
        dispatch({ type: "username", payload: payload });

        debounceErrorChecks(trimmedValue, hasWhiteSpace, value);


    };

    const inputErrorStyle = fieldVal.error ? `${styles.error__highlight}` : "";
    const inputCompParams = {
        classNames: inputErrorStyle,
        value: fieldVal.content,
        type: "text",
        name: "username",
        changeFunc: userNameValidation
    }


    return (
        <DefaultField fieldVal={fieldVal} label={"Username"} params={inputCompParams} />
    );
}


export default UserNameField;