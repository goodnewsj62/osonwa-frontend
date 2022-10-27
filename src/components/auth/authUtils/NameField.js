import { deBounce } from "utils/helpers";
import DefaultField from "./DefaultField";
import styles from "../styles/loginform.module.css";




export default function NamedField({ dispatch, fieldVal, label, type }) {


    const checks = (trimmedValue, hasSpaces) => {
        if (trimmedValue === "" || trimmedValue === " ") {
            const payload = { isValid: false, error: "this field is required" };
            dispatch({ type: type, payload: payload });
        }
        else if (trimmedValue.length < 3) {
            const payload = { isValid: false, error: `${label} must be greater than two characters` };
            dispatch({ type: type, payload: payload });
        } else if (hasSpaces) {
            const payload = { isValid: false, error: `${label} has a space in between characters` };
            dispatch({ type: type, payload: payload });
        } else {
            const payload = { isValid: true, error: "" };
            dispatch({ type: type, payload: payload });
        }
    };


    const debounceChecks = deBounce(checks, 1000);


    const performValidation = (event) => {
        const trimmedValue = event.target.value.trim();
        const value = event.target.value;
        const hasSpaces = /[a-zA-Z0-9]\s[a-zA-Z0-9]/.test(value);

        const payload = { content: value };
        dispatch({ type: type, payload: payload });

        if (event.type === "blur") {
            checks(trimmedValue, hasSpaces);
        } else {
            debounceChecks(trimmedValue, hasSpaces);
        }
    };



    const inputErrorStyle = fieldVal.error ? `${styles.error__highlight}` : "";
    const inputCompParams = {
        classNames: inputErrorStyle,
        value: fieldVal.content,
        type: "text",
        name: label,
        blurFunc: performValidation,
        changeFunc: performValidation
    }



    return (
        <DefaultField fieldVal={fieldVal} label={label} params={inputCompParams} />
    );
}