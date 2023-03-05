import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { BsHeartFill, BsFillQuestionCircleFill } from "react-icons/bs";
import { FaHandshake } from "react-icons/fa";
import { MdPrivacyTip } from "react-icons/md";
import { TiContacts } from "react-icons/ti";
import { NavLink } from "react-router-dom";

import styles from "./styles/sidenav.module.css";



function NavOthers(props) {
    const iconSize = useContext(DefaultIconSize);
    const classes = (navState) => navState.isActive ? styles.active : "";
    return (
        <nav aria-label="other relevant navigation" className={styles.other__nav}>
            <ul>
                <li>
                    <NavLink className={classes} to="/support">
                        <BsHeartFill size={iconSize} />
                        <span></span>
                        Support
                    </NavLink>
                </li>
                <li>
                    <NavLink className={classes} to="/about">
                        <BsFillQuestionCircleFill size={iconSize} />
                        <span></span>
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink className={classes} to="/contact">
                        <TiContacts size={iconSize} />
                        <span></span>
                        Contact
                    </NavLink>
                </li>
                <li>
                    <NavLink className={classes} to="/privacy">
                        <MdPrivacyTip size={iconSize} />
                        <span></span>
                        Privacy Policy
                    </NavLink>
                </li>
                <li>
                    <NavLink className={classes} to="/terms">
                        <FaHandshake size={iconSize} />
                        <span></span>
                        Terms Of Use
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}



export default NavOthers;