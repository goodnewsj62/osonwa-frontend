import DefaultField from "./DefaultField";
import styles from "../styles/loginform.module.css";




const ComfirmPasswordField = ({ fieldVal, dispatch, passwordVal }) => {

    const performValidation = (event) => {
        const trimmedValue = event.target.value.trim();
        const value = event.target.value;

        dispatch({ type: "comfirmPass", payload: { content: value } });

        if (trimmedValue === "" || trimmedValue === " ") {
            const payload = { isValid: false, error: "this field cannot be left empty" };
            dispatch({ type: "comfirmPass", payload });
        } else if (passwordVal.content !== value) {
            const payload = { isValid: false, error: "passwords do not match" };
            dispatch({ type: "comfirmPass", payload });
        } else if (passwordVal.content === value) {
            const payload = { isValid: true, error: "" };
            dispatch({ type: "comfirmPass", payload });
        }
    };


    const inputErrorStyle = fieldVal.error ? `${styles.error__highlight}` : "";
    const inputCompParams = {
        classNames: inputErrorStyle,
        value: fieldVal.content,
        type: "password",
        name: "comfirm password",
        blurFunc: performValidation,
        changeFunc: performValidation
    }


    return (
        <DefaultField fieldVal={fieldVal} label={"Comfirm Password"} params={inputCompParams} />
    )
};


export default ComfirmPasswordField;