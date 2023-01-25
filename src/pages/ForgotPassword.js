import Main from "components/others/MainWrapper";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/pass.module.css";



const ForgotPassword = (props) => {
    const nav = useNavigate();
    const inpRef = useRef();

    const resetHandler = (event) => {
        event.preventDefault();
        const payload = {
            "payload": { email: inpRef.current.value },
            "url": "auth/change-password/",
            "action": "set your password"
        };

        nav("/change-password/", { state: payload });
    }

    return (
        <Main>
            <form className={styles.form__cover} onSubmit={resetHandler}>
                <div className={styles.main__form}>
                    <label htmlFor="forgot__email">Enter email address</label>
                    <input type="email" id="forgot__email" ref={inpRef} />
                    <button>
                        Send
                    </button>
                </div>
            </form>
        </Main>
    )
};


export default ForgotPassword;