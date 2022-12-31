
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
            <div className={`${styles.left}`}>
                <button  type="button">
                    <FaAngleLeft size={iconSize} />
                </button>
            </div>
            <div className={styles.slides}>
                {tags}
            </div>
            <div className={`${styles.right}`} >
                <button type="button">
                    <FaAngleRight size={iconSize} />
                </button>
            </div>
        </div>
    )
};

export default TagSlide;