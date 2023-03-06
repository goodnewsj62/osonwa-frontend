
import Main from "components/others/MainWrapper";
import { Link } from "react-router-dom";
import styles from "./styles/others.module.css";




const Support = () => {
    return (
        <Main>
            <div className={styles.container}>
                <h1>Support</h1>
                <section className={styles.main}>
                    <div className={styles.top}></div>
                    <div className={styles.content}>
                        You could support Osonwa by sharing links with friends and tech-savvy individuals that this platform could be of benefit to.
                        You could also support us with suggestions on how to improve this website by <Link to="/contact">contacting</Link> us.
                        You could help us report bugs and security issues found on this website <Link to="/contact">here</Link> also.
                    </div>
                    <div className={styles.bottom}></div>
                </section>
            </div>
        </Main>
    );
};

export default Support;