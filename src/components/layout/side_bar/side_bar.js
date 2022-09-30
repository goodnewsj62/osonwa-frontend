import { MainNav, NavOthers } from "./sidenavs";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import { ImNewspaper } from "react-icons/im";
import { BsBroadcast } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";


import styles from "../styles/sidebar/sidebar.module.css";
import style from "../styles/sidebar/iconbar.module.css";
import { useContext } from "react";
import { ToggleMode } from "pages/Layout";


function SideBar(props) {
    const [mode, _] = useContext(ToggleMode);
    return (
        <aside aria-label="side bar" className={`${styles.side__bar} ${mode === "dark" ? styles.dark__bar : ''}`}>
            <div className={styles.wrap__up}>
                <MainNav />
                <div className={styles.demacation}></div>
                <div className={styles.close__bar}>
                    <VscTriangleLeft size={20} />
                </div>
                <section aria-labelledby="#others">
                    <h4 id="others">Others</h4>
                    <NavOthers />
                </section>
            </div>
        </aside>
    )
}




function IconBar() {
    const iconSize = 20;
    return (
        <div aria-label="icon nav" className={style.icon__bar}>
            <div className={style.curve__top}>
                <div></div>
            </div>
            <ul>
                <li>
                    <ImNewspaper size={iconSize * 0.9} />
                </li>
                <li>
                    <BsBroadcast size={iconSize * 0.9} />
                </li>
                <li>
                    <VscTriangleRight size={iconSize * 1.3} />
                </li>
                <li>
                    <GiNotebook size={iconSize * 0.99} />
                </li>
                <li>
                    <FaBoxOpen size={iconSize * 0.98} />
                </li>
            </ul>
            <div className={style.curve__bottom}>
                <div></div>
            </div>
        </div>
    )
}

export { IconBar };
export default SideBar;