import { FcLike, FcFolder } from "react-icons/fc";
import styles from "./styles/OtherNavOptions.module.css";



const OtherNavOptions = (props) => {
    const toggleShow = () => { };
    return (
        <ul onClick={(e) => { toggleShow(e) }} className={styles.previous__actions}>
            <li>
                <FcFolder size={20} />
                <p>Saved</p>
            </li>
            <li>
                <FcLike size={20} />
                <p>Liked</p>
            </li>
        </ul>
    );
};



export default OtherNavOptions;