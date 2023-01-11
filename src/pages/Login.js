import { Link } from "react-router-dom";

import LoginForm from "components/auth/LoginForm";
import { useState } from "react";
import ErrorContainer from "components/others/ErrorDisplay";
import SocialWrapper from "components/auth/SocialLogin";
import Decoration from "components/others/SideDecoration";
import styles from "./styles/login.module.css";
import { baseAxiosInstance } from "utils/requests";



export default function Login(props) {
    const [errorInfo, setErrorInfo] = useState({ state: false, message: "" });
    const handleGoogleAuth = async (resp) => {

        /*
            send credentials to backend 
            positive-response:
                save jwt token, change login status
                redirect to home or navigate to next
            negative pop up a message
        */
        try {
            const response = await baseAxiosInstance.post(`/auth/google/`, { token: resp.credential }, {
                validateStatus: (status) => status < 400
            });

            if (response.status === 308) {
                // pop up sign up form
            } else {
                // save jwt token
                // mark user as logged in 
                // redirect to next or home page  
            }

        } catch (err) {
            if (err.response.status >= 500) { //TODO: create standard error variables
                // display an error message
            } else if (err.response.status >= 400 && err.response.status < 500) {
                // display error message
            }

            if (err.request) {
                // 
            }
        }
    };

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
                        Login
                    </h1>
                </section>
                <section className={styles.main__form}>
                    <LoginForm />
                </section>
                <span className={styles.demacation}> Or, login via</span>
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