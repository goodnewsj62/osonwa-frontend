import { deBounce } from "utils/helpers";
import styles from "../styles/loginform.module.css";
import DefaultField from "./DefaultField";




const UserNameField = ({ dispatch, fieldVal }) => {
    const userNameExists = (value) => false; // remote call




    const performErrorChecks = (trimmedValue, hasWhiteSpace, value, alreadyTaken) => {
        if (trimmedValue === "" || trimmedValue === " ") {
            const payload = { isValid: false, error: "this field is required" };
            dispatch({ type: "username", payload: payload });
        } else if (trimmedValue.length < 3) {
            const payload = { isValid: false, error: "username must be greater than two characters" };
            dispatch({ type: "username", payload: payload });
        } else if (hasWhiteSpace) {
            const payload = { isValid: false, error: "username cant contain spaces" };
            dispatch({ type: "username", payload: payload });
        }
        else if (alreadyTaken) {
            const payload = { isValid: false, error: "username has already been taken" };
            dispatch({ type: "username", payload: payload });
        } else {
            const payload = { isValid: true, error: "" };
            dispatch({ type: "username", payload: payload });
        }
    };

    const debounceErrorChecks = deBounce(performErrorChecks, 1000);

    const userNameValidation = (event) => {
        const trimmedValue = event.target.value.trim();
        const value = event.target.value;
        const alreadyTaken = userNameExists(value);
        const hasWhiteSpace = value.includes(" ");

        const payload = { content: value };
        dispatch({ type: "username", payload: payload });

        if (event.type === "blur") {
            performErrorChecks(trimmedValue, hasWhiteSpace, value, alreadyTaken);
        } else {
            debounceErrorChecks(trimmedValue, hasWhiteSpace, value, alreadyTaken);
        }

        return
    };

    const inputErrorStyle = fieldVal.error ? `${styles.error__highlight}` : "";
    const inputCompParams = {
        classNames: inputErrorStyle,
        value: fieldVal.content,
        type: "text",
        name: "username",
        blurFunc: userNameValidation,
        changeFunc: userNameValidation
    }


    return (
        <DefaultField fieldVal={fieldVal} label={"Username"} params={inputCompParams} />
    );
}


export default UserNameField;