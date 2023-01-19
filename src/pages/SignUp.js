import { Link } from "react-router-dom";
import SocialWrapper from "components/auth/SocialLogin";
import SignUpModal from "components/auth/SignUpModal";
import Decoration from "components/others/SideDecoration";
import styles from "./styles/login.module.css";
import ErrorContainer from "components/others/ErrorDisplay";
import InfinteToFroBar from "components/others/loaders/ToFroBar";
import { useState } from "react";



export default function SignUp(props) {
    const [errorInfo, setErrorInfo] = useState({ state: false, message: "" });
    const [register, setRegister] = useState({ state: false, email: "", cred: {}, url: "" });
    const [loader, setLoader] = useState(false);

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
                        Signup
                    </h1>
                </section>
                {/* <span className={styles.demacation}> Or, sign up via</span> */}
                <SocialWrapper type={"rect"} setRegisterInfo={setRegister} setErrorInfo={setErrorInfo} setLoader={setLoader} />
                <span className={styles.copyright}>
                    &copy; 2023 Osonwa. All rights reserved.
                </span>
            </main>
            <aside>
                <Decoration />
            </aside>
            {register.state && register.email && register.cred && <SignUpModal setLoader={setLoader} extraInfo={register} />}        </div>
    )
};