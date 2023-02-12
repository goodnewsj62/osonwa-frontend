import { Link } from "react-router-dom";
import styles from "./styles/cardTag.module.css";

const TagDiv = ({ tagsInfo: { tags, tagLink } }) => {
    const fetchedTags = tags.map((item) => {
        return (
            <div key={item.id} className={styles.tag}>
                <Link to="#" >
                    {item.tag_name}
                </Link>
            </div>
        );
    });

    return (
        <div className={styles.label}>
            <div className={styles.tags}>
                {fetchedTags}
            </div>
        </div>
    )
};


export default TagDiv;