import { useState } from "react";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import Input from "./Input";
import styles from "./styles/loginform.module.css";


export default function SignUpForm({ switchForm }) {
    const [passShow, setPassShow] = useState(false);

    const togglePasswordVisibility = (event, value) => {
        if (value === "show") {
            // input.type =  "text";
            setPassShow(true);
        } else {
            setPassShow(false);
        }
    };

    const iconSize = 20;
    return (
        <form className={styles.form}>
            <div className={`${styles.form__div}`}>
                <label htmlFor="username">
                    Username
                </label>
                <Input type={"text"} />
            </div>
            <div className={`${styles.form__div}`}>
                <label htmlFor="email">
                    Email
                </label>
                <Input type={"email"} />
            </div>
            <div className={`${styles.form__div}`}>
                <label htmlFor="first__name">
                    Firstname
                </label>
                <Input type={"text"} />
            </div>
            <div className={`${styles.form__div}`}>
                <label htmlFor="last__name">
                    Lastname
                </label>
                <Input type={"text"} />
            </div>
            <div className={`${styles.form__div} ${styles.password__div}`}>
                <label htmlFor="password">
                    Password
                </label>
                {passShow ? <Input type={"text"} /> : <Input type={"password"} />}
                <div>
                    {
                        passShow ?
                            <span onClick={(e) => togglePasswordVisibility(e, "hide")} className={`${styles.open__eye}`}>
                                <AiOutlineEye size={iconSize} />
                            </span> :
                            <span onClick={(e) => togglePasswordVisibility(e, "show")} className={`${styles.close__eye}`}>
                                <AiFillEyeInvisible size={iconSize} />
                            </span>
                    }
                </div>
            </div>
            <div className={`${styles.form__div} ${styles.password__div}`}>
                <label htmlFor="confirm__password">
                    Comfirm Password
                </label>
                <Input type={"password"} />
            </div>
            <div className={styles.submit}>
                <button type="submit">
                    Sign Up
                </button>
            </div>
            <div className={`${styles.other__links}`}>
                <Link to="/login" >
                    already got an account? sign in
                </Link>
            </div>
        </form>
    );
};