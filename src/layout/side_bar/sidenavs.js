import { ImNewspaper } from "react-icons/im";
import { BsBroadcast, BsHeartFill, BsFillQuestionCircleFill } from "react-icons/bs";
import { FaBoxOpen, FaHandshake } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { TbJumpRope } from "react-icons/tb";
import { MdPrivacyTip } from "react-icons/md";
import { TiContacts } from "react-icons/ti";

import styles from "../styles/sidebar/sidenav.module.css";

function MainNav(props) {
    const iconSize = 20
    return (
        <nav aria-label="side nav bar" className={styles.main__nav}>
            <ul>
                <li>
                    <ImNewspaper size={iconSize} /><span></span> News
                </li>
                <li>
                    <BsBroadcast size={iconSize} /> <span></span> Trending
                </li>
                <li>
                    <FaBoxOpen size={iconSize} /><span></span> Fresh
                </li>
                <li>
                    <GiNotebook size={iconSize} /> <span></span> Articles
                </li>
                <li>
                    <TbJumpRope size={iconSize} /> <span></span> Threads
                </li>
            </ul>
        </nav>
    )
}


function NavOthers(props) {
    return (
        <nav aria-label="other relevant navigation" className={styles.other__nav}>
            <ul>
                <li>
                    <BsHeartFill />
                    <span></span>
                    Support
                </li>
                <li>
                    <BsFillQuestionCircleFill />
                    <span></span>
                    About
                </li>
                <li>
                    <TiContacts />
                    <span></span>
                    Contact
                </li>
                <li>
                    <MdPrivacyTip />
                    <span></span>
                    Privacy Policy
                </li>
                <li>
                    <FaHandshake />
                    <span></span>
                    Terms Of Use
                </li>
            </ul>
        </nav>
    )
}


export { NavOthers, MainNav };