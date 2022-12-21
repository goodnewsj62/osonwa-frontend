
import { useState } from "react";
import { FiBell } from "react-icons/fi";
import styles from "./styles/nav.module.css";


export default function NotificationComp({ iconSize }) {
    const [isOpen, setIsOpen] = useState(false);

    const onClickHandler = () => undefined;

    return (
        <div className={styles.bell}>
            <span>10+</span>
            <FiBell size={iconSize} />
        </div>
    );
};