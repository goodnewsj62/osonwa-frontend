import ChangeApperance from "./ToggleMode";
import styles from "./styles/ApperanceAndLogout.module.css";
import { useDispatch } from "react-redux";
import { clearToken } from "store/authSlice";




const ApperanceAndLogout = ({ showNav }) => {
    const dispatch = useDispatch();

    const logoutHandler = (event) => {
        dispatch(clearToken());
        showNav(event);
    };

    return (
        <ul className={styles.nav__last}>
            <li>
                <ChangeApperance />
            </li>
            <li onClick={logoutHandler}>Logout</li>
        </ul>
    );
};


export default ApperanceAndLogout;