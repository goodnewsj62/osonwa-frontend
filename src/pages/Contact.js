
import Main from "components/others/MainWrapper";
import styles from "./styles/others.module.css";



const Contact = () => {
    return (
        <Main>
            <div className={styles.container}>
            <h1>Contact Us</h1>
            <section className={styles.aside}>
                    we are just a stone throw away
            </section>
            <section className={styles.main}>
                <div className={styles.top}></div>
                <div className={styles.content}>
                    <div>We did love to her from you </div>
                    <div>Contact us via email: <a href="mailto:goodnewsj62@gmail.com" >goodnewsj62@gmail.com</a></div>
                    <div>Please if you find a bug or security issue you could also report the bug <a href="https://github.com/goodnewsj62/osonwa-frontend/issues" >here</a> at out github repo</div>
                </div>
                <div className={styles.bottom}></div>
            </section>
            </div>
        </Main>
    );
};

export default Contact;