import { ImNewspaper } from "react-icons/im";
import { BsBroadcast } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { TbJumpRope } from "react-icons/tb";

import styles from "./styles/sidenav.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { DefaultIconSize } from "components/wrappers/IconSize";


function MainNav(props) {
    const iconSize = useContext(DefaultIconSize);
    const classes = (navState) => navState.isActive ? styles.active : "";
    return (
        <nav aria-label="side nav bar" className={styles.main__nav}>
            <ul>
                <li>
                    <NavLink className={classes} to="/"><ImNewspaper size={iconSize} /><span></span> News</NavLink>
                </li>
                <li>
                    <NavLink className={classes} to="/trending" ><BsBroadcast size={iconSize} /> <span></span> Trending</NavLink>
                </li>
                <li>
                    <NavLink className={classes} to="/fresh"> <FaBoxOpen size={iconSize} /><span></span> Fresh</NavLink>
                </li>
                <li>
                    <NavLink className={classes} to="/articles"><GiNotebook size={iconSize} /> <span></span> Articles</NavLink>
                </li>
                <li>
                    <NavLink className={classes} to="/threads"><TbJumpRope size={iconSize} /> <span></span> Threads</NavLink>
                </li>
            </ul>
        </nav>
    )
}





export default MainNav;