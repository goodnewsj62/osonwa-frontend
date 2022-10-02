import { BiSearch } from "react-icons/bi";
import { FiBell, FiPlusSquare } from "react-icons/fi";
import Profile from "./ProfileNav/Profile";
import styles from "./styles/nav.module.css";

// import {Link} from "react-router-dom";

function Nav(props) {

    return (
        <nav className={`${styles.head__nav} header__nav`}>
            <ul className={`${styles.head__ul}`}>
                <li>
                    <BiSearch size={20} className="nav__search" />
                </li>
                <li>
                    <FiPlusSquare size={20} />
                </li>
                <li>
                    <div className={styles.bell}>
                        <span>10+</span>
                        <FiBell size={20} />
                    </div>
                </li>
                <li className={styles.auth}>
                    <button className={`border__anime`}>
                        Login
                    </button>
                </li>
                <li className={styles.profile__icon}>
                    <Profile />
                </li>
            </ul>
        </nav>
    )
}


export default Nav;