import FacebookHandler from "./socialComponents/Facebook";
import GoogleHandler from "./socialComponents/Google";
import TwitterHandler from "./socialComponents/Twitter";
import styles from "./styles/socials.module.css";

export default function SocialWrapper({ setErrorInfo, callbacks }) {
    const size = 20;
    const { gCallback } = callbacks;
    return (
        <section className={styles.socials} aria-label="social login">
            <GoogleHandler callbackHandler={gCallback} setErrorInfo={setErrorInfo} size={size} />
            <FacebookHandler setErrorInfo={setErrorInfo} size={size} />
            <TwitterHandler setErrorInfo={setErrorInfo} size={size} />
        </section>
    );
};