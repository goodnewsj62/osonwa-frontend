import { Link, useLocation } from "react-router-dom";

import LoginForm from "components/auth/LoginForm";
import { useState } from "react";
import ErrorContainer from "components/others/ErrorDisplay";
import SocialWrapper from "components/auth/SocialLogin";
import Decoration from "components/others/SideDecoration";
import styles from "./styles/login.module.css";
import { baseAxiosInstance } from "utils/requests";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveAuthToken } from "store/authSlice";


export default function Login(props) {
    const [errorInfo, setErrorInfo] = useState({ state: false, message: "" });
    const [register, setRegister] = useState({ state: false, email: "", cred: "" });
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();

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
                setRegister({ state: true, email: response.data.message, cred: resp.credential });
            } else {
                const data = response.data.data
                const locData = location.state
                dispatch(saveAuthToken(data))
                if (locData && "next" in locData) {
                    navigate(`/${locData.next}`);
                } else {
                    navigate("/")
                }
            }

        } catch (err) {
            if (err.response.status >= 500) { //TODO: create standard error variables
                setErrorInfo({ state: true, message: "oops an error occurred in our system" });
            } else if (err.response.status >= 400 && err.response.status < 500) {
                setErrorInfo({ state: true, message: err.response.data.message });
            }

            if (err.request) {
                setErrorInfo({ state: true, message: "request not sent. tip: check if you're connected to the internet" });
            }
        }
    };

    const callbacks = { gCallback: handleGoogleAuth };
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
                <SocialWrapper callbacks={callbacks} setErrorInfo={setErrorInfo} />
                <span className={styles.copyright}>
                    &copy; 2023 Osonwa. All rights reserved.
                </span>
            </main>
            <aside>
                <Decoration />
            </aside>
            {/* signup popup */}
        </div>
    )
};