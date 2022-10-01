import ChangeApperance from "./ToggleMode";
import styles from "./styles/ApperanceAndLogout.module.css";




const ApperanceAndLogout = ({showNav}) => {

    return (
        <ul className={styles.nav__last}>
            <li>
                <ChangeApperance />
            </li>
            <li onClick={showNav}>Logout</li>
        </ul>
    );
};


export default ApperanceAndLogout;