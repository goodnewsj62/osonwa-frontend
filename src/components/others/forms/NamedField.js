import { deBounce } from "utils/helpers";
import styles from "./styles/fields.module.css";
import TextField from "./TextField";




export default function NamedField({ dispatch, fieldVal, label, type, validator }) {

    const checks = validator;
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
        <TextField fieldVal={fieldVal} label={label} params={inputCompParams} />
    );
}