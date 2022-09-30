import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

import styles from "./styles/MessagePopup.module.css";




function MessagePopup(props) {
    const iconSize = useContext(DefaultIconSize);
    return (
        <div className={styles.message}>
            <BsCheckCircleFill className={styles.icon__success} size={iconSize} />
            <MdCancel className={styles.icon__failure} size={iconSize} />
            <span></span>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing</p>
            <span className={styles.link}>
                link
            </span>
        </div>
    );
};


export default MessagePopup;