import { BiSearch } from "react-icons/bi";
import {FiBell, FiPlusSquare} from "react-icons/fi";
import Profile from "./profile";
// import {Link} from "react-router-dom";

function Nav(props) {
    return (
        <nav className="head__nav">
            <ul>
                <BiSearch className="nav__search" />
                <li>
                    <FiPlusSquare size={17} />
                </li>
                <li>
                    <div className="bell">
                        <span>10+</span>
                        <FiBell size={17} />
                    </div>
                </li>
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