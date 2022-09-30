import ChangeApperance from "./ToggleMode";
import styles from "./styles/ApperanceAndLogout.module.css";




const ApperanceAndLogout = (props) => {

    const toggleShow = (e) => { };
    return (
        <ul className={styles.nav__last}>
            <li>
                <ChangeApperance />
            </li>
            <li onClick={(e) => { toggleShow(e) }}>Logout</li>
        </ul>
    );
};


export default ApperanceAndLogout;