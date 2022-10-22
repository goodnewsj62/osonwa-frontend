import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from "./styles/loginform.module.css";


export default function SignUpForm(props) {
    const iconSize = 20;
    return (
        <form className={styles.form}>
            <div className={`${styles.form__div}`}>
                <label htmlFor="username">
                    Username
                </label>
                <input type="text" name="username" id="username" />
            </div>
            <div className={`${styles.form__div}`}>
                <label htmlFor="email">
                    Email
                </label>
                <input type="text" name="email" id="email" />
            </div>
            <div className={`${styles.form__div}`}>
                <label htmlFor="first__name">
                    Firstname
                </label>
                <input type="text" name="first_name" id="first__name" />
            </div>
            <div className={`${styles.form__div}`}>
                <label htmlFor="last__name">
                    Lastname
                </label>
                <input type="text" name="last_name" id="last__name" />
            </div>
            <div className={`${styles.form__div} ${styles.password__div}`}>
                <label htmlFor="password">
                    Password
                </label>
                <input type="password" name="password" id="password" />
                <div>
                    <span className="open__eye">
                        <AiOutlineEye size={iconSize} />
                    </span>
                    <span className="close__eye">
                        <AiFillEyeInvisible size={iconSize} />
                    </span>
                </div>
            </div>
            <div className={`${styles.form__div} ${styles.password__div}`}>
                <label htmlFor="confirm__password">
                    Comfirm Password
                </label>
                <input type="password" name="confirm_password" id="confirm__password" />
            </div>
            <div className={styles.submit}>
                <button type="submit">
                    Login
                </button>
            </div>
        </form>
    );
};