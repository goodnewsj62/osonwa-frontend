import { useState } from "react";
import {Link} from "react-router-dom";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import Input from "./Input";
import styles from "./styles/loginform.module.css";

export default function LoginForm(props) {
    const [passShow, setPassShow] = useState(false);

    const togglePasswordVisibility = (event,value)=>{
        if(value === "show"){
            // input.type =  "text";
            setPassShow(true);
        }else{
            setPassShow(false);
        }
    };
    const iconSize = 20;
    return (
        <form autoComplete="off" className={styles.form}>
            <div className={`${styles.form__div}`}>
                <label htmlFor="username">
                    Username/Email
                </label>
                <Input type={"text"} />
            </div>
            <div className={`${styles.form__div} ${styles.password__div}`}>
                <label htmlFor="password">
                    Password
                </label>
                {passShow ? <Input type={"text"} /> : <Input type={"password"} /> }
                <div>
                    {
                        passShow ?
                        <span onClick={(e)=>togglePasswordVisibility(e,"hide")} className={`${styles.open__eye}`}>
                            <AiOutlineEye size={iconSize} />
                        </span> :
                        <span onClick={(e)=>togglePasswordVisibility(e,"show")} className={`${styles.close__eye}`}>
                            <AiFillEyeInvisible size={iconSize} />
                        </span>
                    }
                </div>
            </div>
            <div className={styles.submit}>
                <button type="submit">
                    Login
                </button>
            </div>
            <div className={`${styles.other__links}`}>
                <Link to="/signup">
                    first time? sign up instead
                </Link>
                <button type="button">
                    forgot password
                </button>
            </div>
        </form>
    );
};