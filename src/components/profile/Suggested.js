import { Link } from "react-router-dom";
import styles from "./styles/suggested.module.css";



export default function Suggested(){
    const suggestedTopics = ["python","javaScript","Java","Design Patterns"].map((item)=>{
        return (
            <li key={item}>
                <Link to="/" >
                    <span>{item}</span>
                </Link>
            </li>
        );
    });

    return(
        <section className={styles.container}>
            <span>Suggested Topics</span>
            <ul>
                {suggestedTopics}
            </ul>
        </section>
    )
};