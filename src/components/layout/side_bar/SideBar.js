import MainNav from "./Sidenav";
import { VscTriangleLeft } from "react-icons/vsc";


import styles from "./styles/sidebar.module.css";
import NavOthers from "./NavOptions";
import { useDispatch, useSelector } from "react-redux";
import sideBarActions from "store/SideBarSlice";

function SideBar({ sideBarState }) {
    const dispatch = useDispatch();
    const currentMode = useSelector((states) => states.mode);

    const showBarHandler = (event) => {
        dispatch(sideBarActions.hide());
    };

    const modeClass = currentMode === "dark" ? styles.dark__bar : "";
    const barAnimeClasses = sideBarState ? `${styles.show__bar}` : `${styles.hide__bar}`;
    const classes = `${styles.side__bar} ${barAnimeClasses} ${modeClass}`;

    return (
        <aside aria-label="side bar" className={classes}>
            <div className={styles.wrap__up}>
                <MainNav />
                <div className={styles.demacation}></div>
                <button onClick={showBarHandler} className={styles.close__bar}>
                    <VscTriangleLeft size={20} />
                </button>
                <section aria-labelledby="#others">
                    <h4 id="others">Others</h4>
                    <NavOthers />
                </section>
            </div>
        </aside>
    )
}





export default SideBar;