import { ImNewspaper } from "react-icons/im";
import { BsBroadcast, BsHeartFill, BsFillQuestionCircleFill } from "react-icons/bs";
import { FaBoxOpen, FaHandshake } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { TbJumpRope } from "react-icons/tb";
import { MdPrivacyTip } from "react-icons/md";
import { TiContacts } from "react-icons/ti";

import styles from "../styles/sidebar/sidenav.module.css";

const iconSize = 20

function MainNav(props) {

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


export { NavOthers, MainNav };