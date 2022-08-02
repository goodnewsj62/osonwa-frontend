import { BiSearch } from "react-icons/bi";
import Profile from "./profile";
// import {Link} from "react-router-dom";

function Nav(props) {
    return (
        <nav className="head__nav">
            <ul>
                <BiSearch className="nav__search" />
                <li>create</li>
                <li>notification</li>
                <li className="auth">
                    <button className="border__anime">
                        Login
                    </button>
                </li>
                <li className="profile__icon">
                    <Profile />
                </li>
            </ul>
        </nav>
    )
}


export default Nav;