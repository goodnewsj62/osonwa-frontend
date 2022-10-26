import Input from "../Input";
import styles from "../styles/loginform.module.css";




const UserNameField = ({dispatch, fieldVal})=>{
    const userNameExists = (value)=> false; // remote call

    const changeHandler =  (event)=>{
        //TODO: debounce
        userNameValidation(event);
    };

    const userNameValidation= (event) =>{
        const trimmedValue =  event.target.value.trim();
        const value =  event.target.value;
        const alreadyTaken = userNameExists(value);
        const hasWhiteSpace = null;

        if (  trimmedValue === "" || trimmedValue  === " "){
            const payload =  {content:value, isValid:false, error:"this field is required"};
            dispatch({type:"username", payload: payload});
            return 
        }else if (trimmedValue.length <  3){   
            const payload =  {content:value, isValid:false, error:"username must be greater than two characters"};
            dispatch({type:"username", payload:payload });
            return
        }else if (hasWhiteSpace){
            const payload =  {content:value, isValid:false, error:"username cant contain spaces"};
            dispatch({type:"username", payload:payload });
            return
        }
        else if(alreadyTaken){
            const payload =  {content:value, isValid:false, error:"username has already been taken"};
            dispatch({type:"username", payload:payload });
            return
        }else{
            const payload =  {content:value, isValid:true, error:""};
            dispatch({type:"username", payload:payload });
        }
        return 
    };

    const spanClasses = fieldVal.error?  `${styles.error__info} ${styles.show__error}` : `${styles.error__info}`;
    const inputErrorStyle = fieldVal.error?  `${styles.error__highlight}` : "";
    const inputCompParams =  {
        classNames: inputErrorStyle,
        value:fieldVal.content,
        type:"text",
        name: "username",
        blurFunc:userNameValidation,
        changeFunc:changeHandler
    }
    
    
    return (
        <div className={`${styles.form__div}`}>
                <label htmlFor="username">
                    Username
                </label>
                <Input params={inputCompParams} />
                <span className={spanClasses}>{fieldVal.error}</span>
        </div>
        
    );
}


export default  UserNameField;