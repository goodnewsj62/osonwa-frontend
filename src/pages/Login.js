import {Link} from "react-router-dom";

import LoginForm from "components/auth/LoginForm";
import { useState } from "react";
import SignUpForm from "components/auth/SignUpForm";
import ErrorContainer from "components/others/ErrorDisplay";
import SocialWrapper from "components/auth/SocialLogin";
import Decoration from "components/others/SideDecoration";
import styles from "./styles/login.module.css";



export default function Login(props){
    const [signupForm, setSignupForm] = useState(false);
    const [errorInfo,  setErrorInfo] = useState({state:false, message:""});

    const switchForms =  ()=> setSignupForm((state)=> !state);

    const SignupText =  "SignUp";
    const LoginText =  "Login";
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link to ="/">
                    <h2>Osonwa.</h2>
                </Link>
            </div>
            <aside>
                <Decoration />
            </aside>
            <main>
                {errorInfo.state && <ErrorContainer errorInterphase={{errorInfo, setErrorInfo}} />}
                <section className={styles.login__text} aria-label="top text">
                    <h1>
                        {signupForm? SignupText: LoginText}
                    </h1>
                </section>
                <section className={styles.main__form}>
                    {!signupForm && <LoginForm switchForm={switchForms} />}
                    {signupForm && <SignUpForm switchForm={switchForms} />}
                </section>
                <span> Or, login via</span>
                <SocialWrapper setErrorInfo={setErrorInfo} />
                <span className={styles.copyright}>
                    &copy; 2023 Osonwa. All rights reserved.
                </span>
            </main>

        </div>
    )
};