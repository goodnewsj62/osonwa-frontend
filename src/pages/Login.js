import { Link } from "react-router-dom";
import LoginForm from "components/auth/LoginForm";
import { useState } from "react";
import ErrorContainer from "components/others/ErrorDisplay";
import SocialWrapper from "components/auth/SocialLogin";
import Decoration from "components/others/SideDecoration";
import styles from "./styles/login.module.css";
import SignUpModal from "components/auth/SignUpModal";
import InfinteToFroBar from "components/others/loaders/ToFroBar";


export default function Login(props) {
    const [errorInfo, setErrorInfo] = useState({ state: false, message: "" });
    const [register, setRegister] = useState({ state: false, email: "", cred: {}, url: "" });
    const [loader, setLoader] = useState(false);


    const aside_style = loader ? { zIndex: 600 } : {}


    return (
        <div className={styles.container}>
            {loader && <InfinteToFroBar />}
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
                    <LoginForm setErrorInfo={setErrorInfo} setLoader={setLoader} />
                </section>
                <span className={styles.demacation}> Or, login via</span>
                <SocialWrapper type={"normal"} setRegisterInfo={setRegister} setErrorInfo={setErrorInfo} setLoader={setLoader} />
                <span className={styles.copyright}>
                    &copy; 2023 Osonwa. All rights reserved.
                </span>
            </main>
            <aside style={aside_style}>
                <Decoration />
            </aside>
            {register.state && register.email && register.cred && <SignUpModal setLoader={setLoader} extraInfo={register} />}
        </div>
    )
};