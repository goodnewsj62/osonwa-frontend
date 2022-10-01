import { ImNewspaper } from "react-icons/im";
import { BsBroadcast } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { TbJumpRope } from "react-icons/tb";

import styles from "./styles/sidenav.module.css";

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





export default MainNav;