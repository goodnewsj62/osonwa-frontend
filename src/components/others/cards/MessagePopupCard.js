import { Link } from "react-router-dom";
import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

import styles from "./styles/MessagePopup.module.css";
import { useSelector } from "react-redux";




function MessagePopup({ message, link, category }) {
    const iconSize = useContext(DefaultIconSize);
    let icon = <MdCancel className={styles.icon__failure} size={iconSize} />;

    const mode = useSelector((states) => states.mode);

    if (category === "success") {
        icon = <BsCheckCircleFill className={styles.icon__success} size={iconSize} />;
    }

    let linkElement = <></>;
    if (link) {
        linkElement = (
            <span className={styles.link}>
                <Link to={link}>link</Link>
            </span>
        );
    }

    return (
        <div className={styles.message} data-theme={mode} >
            {icon}
            <span></span>
            <p>{message}</p>
            {linkElement}
        </div>
    );
};


export default MessagePopup;