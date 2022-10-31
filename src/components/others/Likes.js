import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styles from "./styles/actioncomp.module.css";




const Likes = (props) => {
    const iconSize = useContext(DefaultIconSize);
    return (
        <div className={styles.likes}>
            <div className={styles.icon}>
                <AiOutlineHeart size={iconSize} />
            </div>
            <div className={`${styles.count} cnt`}>
                200
            </div>
        </div>
    );
};

export default Likes;