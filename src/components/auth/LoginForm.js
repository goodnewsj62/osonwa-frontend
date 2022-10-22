import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from "./styles/loginform.module.css";

export default function LoginForm(props) {

    const iconSize = 20;
    return (
        <form className={styles.form}>
            <div className={`${styles.form__div}`}>
                <label htmlFor="">
                    Username/Email
                </label>
                <input type="text" name="username" id="username" />
            </div>
            <div className={`${styles.form__div} ${styles.password__div}`}>
                <label htmlFor="">
                    Password
                </label>
                <input type="password" name="password" id="password" />
                <div>
                    <span className={`${styles.open__eye}`}>
                        <AiOutlineEye size={iconSize} />
                    </span>
                    <span className={`${styles.close__eye}`}>
                        <AiFillEyeInvisible size={iconSize} />
                    </span>
                </div>
            </div>
            <div className={styles.submit}>
                <button type="submit">
                    Login
                </button>
            </div>
            <div className={`${styles.other__links}`}>
                <button type="button">
                    first time? sign up instead
                </button>
                <button type="button">
                    forgot password
                </button>
            </div>
        </form>
    );
};