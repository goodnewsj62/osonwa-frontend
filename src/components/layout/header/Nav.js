import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
import { useSelector } from "react-redux";
import LoginLink from "./buttons/LoginButton";
import NotificationComp from "./NotificationComp";
import Profile from "./ProfileNav/Profile";
import styles from "./styles/nav.module.css";

// import {Link} from "react-router-dom";

function Nav({ showSearch }) {
    const iconSize = useContext(DefaultIconSize);
    const authState = useSelector((state) => state.authState.state);

    console.log(authState)




    const ProfileLink = (<li className={styles.profile__icon}><Profile /></li>);

    return (
        <nav className={`${styles.head__nav} header__nav`}>
            <ul className={`${styles.head__ul}`}>
                <li onClick={(e) => { showSearch(true) }}>
                    <BiSearch size={iconSize} className="nav__search" />
                </li>
                <li>
                    <FiPlusSquare size={iconSize} />
                </li>
                <li>
                    <NotificationComp iconSize={iconSize} />
                </li>
                {!authState && <LoginLink />}
                {authState && ProfileLink}
            </ul>
        </nav>
    )
}


export default Nav;