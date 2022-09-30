import { BsHeartFill, BsFillQuestionCircleFill } from "react-icons/bs";
import { FaHandshake } from "react-icons/fa";
import { MdPrivacyTip } from "react-icons/md";
import { TiContacts } from "react-icons/ti";

import styles from "./styles/sidenav.module.css";



function NavOthers(props) {
    const iconSize = 20;
    return (
        <nav aria-label="other relevant navigation" className={styles.other__nav}>
            <ul>
                <li>
                    <BsHeartFill size={iconSize} />
                    <span></span>
                    Support
                </li>
                <li>
                    <BsFillQuestionCircleFill size={iconSize} />
                    <span></span>
                    About
                </li>
                <li>
                    <TiContacts size={iconSize} />
                    <span></span>
                    Contact
                </li>
                <li>
                    <MdPrivacyTip size={iconSize} />
                    <span></span>
                    Privacy Policy
                </li>
                <li>
                    <FaHandshake size={iconSize} />
                    <span></span>
                    Terms Of Use
                </li>
            </ul>
        </nav>
    )
}



export default NavOthers;