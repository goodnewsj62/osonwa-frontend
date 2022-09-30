import MainNav from "./Sidenavs";
import { VscTriangleLeft } from "react-icons/vsc";


import styles from "./styles/sidebar.module.css";
import NavOthers from "./NavOptions";

function SideBar(props) {
    const modeClass = "";
    return (
        <aside aria-label="side bar" className={`${styles.side__bar} ${modeClass}`}>
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





export default SideBar;