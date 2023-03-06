
import Main from "components/others/MainWrapper";
import styles from "./styles/others.module.css";



const About = () => {
    return (
        <Main>
            <div className={styles.container}>
                <h1>About</h1>
                <section className={styles.aside}>
                    <p>The only true wisdom is in knowing you know nothing.</p>
                    <i>_socrates</i>
                </section>
                <section className={styles.main}>
                <div className={styles.top}></div>
                Osonwa is an African name from the Igbo tribe in Nigeria, meaning running/racing child.
                <br></br>
                Osonwa is an aggregate news, article, and blogging platform that focuses on the tech space or tech community, feeding you with rich content tailored to match your interests.
                Osonwa serves as an online center to get in on diverse news/article content and topics that match users' interests in tech and the dev world. Osonwa also seeks to improve interactions and opinions between users on the platform to enhance collaboration and learning. We also supply you with rich articles picked from trusted and filtered sources.
                <br></br>
                Our platform also allows anyone to create content that can be of benefit to the community as a whole. Osonwa is open source, and every bit of the code is open for inspection and contribution.
            </section>
            <div className={styles.bottom}></div>
            </div>

        </Main>
    );
};

export default About;