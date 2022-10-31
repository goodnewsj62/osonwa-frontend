import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styles from "./styles/actioncomp.module.css";


const StarComp = (props) => {
    const iconSize = useContext(DefaultIconSize);
    return (
        <div className={styles.star}>
            <div className={styles.icon}>
                <AiOutlineStar size={iconSize} />
            </div>
        </div>
    );
};


export default StarComp;