import DefaultField from "./DefaultField";
import validator from "validator";
import styles from "../styles/loginform.module.css";
import { deBounce } from "utils/helpers";



const EmailField =  ({dispatch, fieldVal})=>{
    const emailExists = (value)=> false;

    const performValueCheck = (trimmedValue, value, alreadyTaken)=>{
        if (trimmedValue === "" || trimmedValue  === " "){
            const payload =  {isValid:false, error:"this field is required"};
            dispatch({type:"email", payload: payload});
        }else if (!validator.isEmail(value)){   
            const payload =  {isValid:false, error:"doesn't look like a valid email"};
            dispatch({type:"email", payload:payload });
        }
        else if(alreadyTaken){
            const payload =  {isValid:false, error:"email already exist"};
            dispatch({type:"email", payload:payload });
        }else{
            const payload =  { isValid:true, error:""};
            dispatch({type:"email", payload:payload });
        }
    };


    const debounceErrorCheck =  deBounce(performValueCheck,1000)

    const emailValidator=  (event)=>{
        const trimmedValue =  event.target.value.trim();
        const value =  event.target.value;
        const alreadyTaken = emailExists(value);

        const payload =  {content:value};
        dispatch({type:"email", payload: payload});
        if(event.type === "blur"){
            performValueCheck(trimmedValue,value,alreadyTaken);
        }else{
            debounceErrorCheck(trimmedValue, value, alreadyTaken);
        }
    };

    const inputErrorStyle = fieldVal.error?  `${styles.error__highlight}` : "";
    const inputCompParams =  {
        classNames: inputErrorStyle,
        value:fieldVal.content,
        type:"email",
        name: "email",
        blurFunc:emailValidator,
        changeFunc:emailValidator
    }


    return (
        <DefaultField fieldVal={fieldVal} label={"Email"} params={inputCompParams} />
    )
};


export default EmailField;