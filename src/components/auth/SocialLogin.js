import { memo } from "react";
import FacebookHandler from "./socialComponents/Facebook";
import GoogleHandler from "./socialComponents/Google";
import TwitterHandler from "./socialComponents/Twitter";
import styles from "./styles/socials.module.css";

export default memo(function SocialWrapper({ setErrorInfo, setRegisterInfo }) {
    const size = 20;
    return (
        <section className={styles.socials} aria-label="social login">
            <GoogleHandler setRegister={setRegisterInfo} setErrorInfo={setErrorInfo} size={size} />
            <FacebookHandler setErrorInfo={setErrorInfo} size={size} />
            <TwitterHandler setErrorInfo={setErrorInfo} size={size} />
        </section>
    );
});