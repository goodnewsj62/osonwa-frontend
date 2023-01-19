import { memo } from "react";
import FacebookHandler from "./socialComponents/Facebook";
import GoogleHandler from "./socialComponents/Google";
import TwitterHandler from "./socialComponents/Twitter";
import styles from "./styles/socials.module.css";

export default memo(function SocialWrapper({ setErrorInfo, setRegisterInfo, setLoader, type }) {
    const size = 20;
    const styleClasses = type === "rect" ? styles.socials__rect : styles.socials;
    return (
        <section className={styleClasses} aria-label="social login">
            <GoogleHandler setRegister={setRegisterInfo}
                setLoader={setLoader}
                setErrorInfo={setErrorInfo}
                type={type}
                size={size} />
            <FacebookHandler setLoader={setLoader}
                setErrorInfo={setErrorInfo}
                size={size}
                type={type}
                setRegister={setRegisterInfo} />
            <TwitterHandler setRegister={setRegisterInfo}
                setLoader={setLoader}
                setErrorInfo={setErrorInfo}
                size={size} type={type} />
        </section>
    );
});