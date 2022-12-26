import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { FcLike, FcFolder } from "react-icons/fc";
import { Link } from "react-router-dom";
import styles from "./styles/OtherNavOptions.module.css";



const OtherNavOptions = ({ showNav }) => {
    const iconSize = useContext(DefaultIconSize);

    return (
        <ul onClick={showNav} className={styles.previous__actions}>
            <li>
                <Link to="/saved" >
                    <FcFolder size={iconSize} />
                    <p>Saved</p>
                </Link>
            </li>
            <li>
                <Link to="/liked">
                    <FcLike size={iconSize} />
                    <p>Liked</p>
                </Link>
            </li>
        </ul>
    );
};



export default OtherNavOptions;