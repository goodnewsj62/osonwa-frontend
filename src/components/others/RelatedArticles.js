import { NavLink } from "react-router-dom";
import styles from "./styles/relatedArt.module.css";




const RelatedArticles = (props) => {
    const classFunc = (state) => state.isActive ? `${styles.nav__highlight}` : ""
    const articles = ["python", "bs basics", "info graph"].map((item) => {
        return (
            <li>
                <NavLink to="#" className={classFunc}>
                    {item}
                </NavLink>
            </li>
        );
    });

    return (
        <ul className={styles.realed__articles}>
            {articles}
        </ul>
    );
};


export default RelatedArticles;