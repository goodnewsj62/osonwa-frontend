import { memo } from "react";
import FacebookHandler from "./socialComponents/Facebook";
import GoogleHandler from "./socialComponents/Google";
import TwitterHandler from "./socialComponents/Twitter";
import styles from "./styles/socials.module.css";

export default memo(function SocialWrapper({ setErrorInfo, setRegisterInfo, setLoader }) {
    const size = 20;
    return (
        <section className={styles.socials} aria-label="social login">
            <GoogleHandler setRegister={setRegisterInfo}
                setLoader={setLoader} setErrorInfo={setErrorInfo} size={size} />
            <FacebookHandler setLoader={setLoader} setErrorInfo={setErrorInfo} size={size} setRegister={setRegisterInfo} />
            <TwitterHandler setRegister={setRegisterInfo}
                setLoader={setLoader} setErrorInfo={setErrorInfo} size={size} />
        </section>
    );
});