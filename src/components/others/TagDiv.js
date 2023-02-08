import { Link } from "react-router-dom";
import styles from "./styles/cardTag.module.css";

const TagDiv = ({ tags, tagLink }) => {
    const fetchedTags = (
        <>
            <div className={styles.tag}>
                <Link to="#" >
                    Python
                </Link>
            </div>
            <div className={styles.tag}>
                <Link to="#">
                    Javascript
                </Link>
            </div>
            <div className={styles.tag}>
                <Link to="#">
                    Beginner stuff
                </Link>
            </div>
        </>
    );
    return (
        <div className={styles.label}>
            <div className={styles.tags}>
                {fetchedTags}
            </div>
        </div>
    )
};


export default TagDiv;