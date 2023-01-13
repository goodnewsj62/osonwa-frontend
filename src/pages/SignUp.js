import { Link } from "react-router-dom";
import SocialWrapper from "components/auth/SocialLogin";
import SignUpModal from "components/auth/SignUpModal";
import Decoration from "components/others/SideDecoration";
import styles from "./styles/login.module.css";



export default function SignUp(props) {

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link to="/">
                    <h2>Osonwa.</h2>
                </Link>
            </div>

            <main className={styles.main}>
                <section className={styles.login__text} aria-label="top text">
                    <h1>
                        Signup
                    </h1>
                </section>
                {/* <span className={styles.demacation}> Or, sign up via</span> */}
                {/* <SocialWrapper  setErrorInfo={setErrorInfo} /> */}
                <span className={styles.copyright}>
                    &copy; 2023 Osonwa. All rights reserved.
                </span>
            </main>
            <aside>
                <Decoration />
            </aside>
            {/* <SignUpModal /> */}
        </div>
    )
};