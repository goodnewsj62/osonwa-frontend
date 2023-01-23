import { deBounce } from "utils/helpers";
import styles from "./styles/fields.module.css";
import TextArea from "./TextArea";




export default function AreaField({ dispatch, fieldVal, label, type, maxChar, customClasses }) {


    const checks = (trimmedValue) => {
        if (trimmedValue === "" || trimmedValue === " ") {
            const payload = { isValid: false, error: "this field is required" };
            dispatch({ type: type, payload: payload });
        }
        else if (trimmedValue.length > 3) {
            const payload = { isValid: false, error: `${label} must be greater than three characters` };
            dispatch({ type: type, payload: payload });
        } else {
            const payload = { isValid: true, error: "" };
            dispatch({ type: type, payload: payload });
        }
    };


    const debounceChecks = deBounce(checks, 1000);


    const performValidation = (event) => {
        const trimmedValue = event.target.value.trim();

        if (trimmedValue.length < maxChar) {
            const payload = { content: trimmedValue };
            dispatch({ type: type, payload: payload });

            if (event.type === "blur") {
                checks(trimmedValue);
            } else {
                debounceChecks(trimmedValue);
            }
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
        <TextArea fieldVal={fieldVal}
            label={label}
            params={inputCompParams}
            maxChar={maxChar}
            customClasses={customClasses}
        />
    );
}