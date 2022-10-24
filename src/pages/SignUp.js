import { Link } from "react-router-dom";

import { useState } from "react";
import ErrorContainer from "components/others/ErrorDisplay";
import SocialWrapper from "components/auth/SocialLogin";
import Decoration from "components/others/SideDecoration";
import styles from "./styles/login.module.css";
import SignUpForm from "components/auth/SignUpForm";



export default function SignUp(props) {
    const [errorInfo, setErrorInfo] = useState({ state: false, message: "" });

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link to="/">
                    <h2>Osonwa.</h2>
                </Link>
            </div>

            <main className={styles.main}>
                {errorInfo.state && <ErrorContainer errorInterphase={{ errorInfo, setErrorInfo }} />}
                <section className={styles.login__text} aria-label="top text">
                    <h1>
                        Signup
                    </h1>
                </section>
                <section className={styles.main__form}>
                    <SignUpForm />
                </section>
                <span className={styles.demacation}> Or, sign up via</span>
                <SocialWrapper setErrorInfo={setErrorInfo} />
                <span className={styles.copyright}>
                    &copy; 2023 Osonwa. All rights reserved.
                </span>
            </main>
            <aside>
                <Decoration />
            </aside>
        </div>
    )
};