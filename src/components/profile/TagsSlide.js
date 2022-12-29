
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useContext } from "react";
import { DefaultIconSize } from "components/wrappers/IconSize";

import styles from "./styles/tags.module.css";


const TagSlide = (props) => {
    const iconSize = useContext(DefaultIconSize);
    const tags = ["python", "3d printing", "UI/UX", "Gaming"].map((item) => {
        return <div className={styles.tag}><Link to="/" >{item}</Link></div>
    });


    return (
        <div className={styles.container}>
            <button className={`${styles.left}`} type="button">
                <FaAngleLeft size={iconSize} />
            </button>
            <div className={styles.slides}>
                {tags}
            </div>
            <button className={`${styles.right}`} type="button">
                <FaAngleRight size={iconSize} />
            </button>
        </div>
    )
};

export default TagSlide;