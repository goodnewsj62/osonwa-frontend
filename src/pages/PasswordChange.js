
import ComfirmPasswordField from "components/auth/authUtils/ComfirmPassword";
import PasswordField from "components/auth/authUtils/PasswordField";
import Main from "components/others/MainWrapper";
import { useState } from "react";
import { useReducer } from "react";
import { useParams } from "react-router-dom";
import { baseAxiosInstance } from "utils/requests";
import styles from "./styles/pass.module.css";

const dS = ()=>({content:"", error:"", isValid:false});
const initialState =  {password:dS(), comfirmPass:dS()}

function reducer(state, action){
    if(action.type ==="password"){
        return {...state, password: {...state.password, ...action.payload}}
    }else{
        return {...state, comfirmPass: {...state.comfirmPass, ...action.payload}}
    }
}


const ChangePassword = (props) => {
    const [userInputs,  dispatch] = useReducer(reducer, initialState);
    const [message, setMessage] = useState({type:"", state:false});
    const params =  useParams();


    const customClasses = `${styles.form__div}`
    const isValid =  userInputs.password.isValid && userInputs.comfirmPass.isValid? true : false;

    const handleSubmit =  async (event)=>{
        event.preventDefault();
        try{
            const data =  {"token": params.token}
            const resp =  await baseAxiosInstance.post("auth/change-password/" , data);
            if (resp.status === 200) setMessage({type:"success", state:true});
        }catch(error){
            setMessage({type:"failure", state:true})
        }
    };

    return(
        <Main>
            <form className={styles.form__cover} onSubmit={handleSubmit}>
                <PasswordField dispatch={dispatch} fieldVal={userInputs.password} />
                <ComfirmPasswordField dispatch={dispatch} fieldVal={userInputs.comfirmPass} passwordVal={userInputs.password} customClasses={customClasses} />
                <button disabled={isValid}>
                    {isValid}
                </button>.toString()
            </form>
        </Main>
    )
};

export default ChangePassword;