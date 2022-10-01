import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { FcLike, FcFolder } from "react-icons/fc";
import styles from "./styles/OtherNavOptions.module.css";



const OtherNavOptions = ({showNav}) => {
    const iconSize = useContext(DefaultIconSize);
    return (
        <ul onClick={showNav} className={styles.previous__actions}>
            <li>
                <FcFolder size={iconSize} />
                <p>Saved</p>
            </li>
            <li>
                <FcLike size={iconSize} />
                <p>Liked</p>
            </li>
        </ul>
    );
};



export default OtherNavOptions;