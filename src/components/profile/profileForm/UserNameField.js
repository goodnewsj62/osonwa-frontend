import { useEffect, useState } from "react";
import { deBounce } from "utils/helpers";
import { baseAxiosInstance } from "utils/requests";
import styles from "components/others/forms/styles/fields.module.css";
import TextField from "components/others/forms/TextField";
import { useSelector } from "react-redux";



const UserNameField = ({ dispatch, fieldVal, customClasses }) => {
    const [usernameExists, setUsernameExists] = useState(false);
    const accountUsername = useSelector((states) => states.profileState.userInfo.username);

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
        if (usernameExists && fieldVal.content !== accountUsername) {
            const payload = { isValid: false, error: "username has already been taken" };
            dispatch({ type: "username", payload: payload });
        }
    }, [usernameExists, dispatch, accountUsername, fieldVal]);



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
        <TextField fieldVal={fieldVal}
            label={"Username"}
            params={inputCompParams}
            customClasses={customClasses}
        />
    );
}


export default UserNameField;