import SignUpForm from "./SignUpForm";
import ErrorContainer from "components/others/ErrorDisplay";
import { memo, useState } from "react";
import styles from "./styles/loginform.module.css";



const SignUpModal = ({ extraInfo: { email, cred } }) => {
    const [errorInfo, setErrorInfo] = useState({ state: false, message: "" });

    return (
        <section className={styles.signup__modal}>
            <h3>Just remaining few steps to take</h3>
            {errorInfo.state && <ErrorContainer errorInterphase={{ errorInfo, setErrorInfo }} />}
            <SignUpForm email={email} cred={cred} setErrorInfo={setErrorInfo} />
        </section>
    )
};

export default memo(SignUpModal);