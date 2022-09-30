
import { IoReorderTwoOutline } from "react-icons/io5"
import Nav from "./Nav";
import SearchBar from "./Search_bar";

import styles from "./styles/header.module.css";
import "./styles/header.css";
// import icon from "../styles/osonwapp.svg";

function Header() {

    return (
        <header>
            <div className={styles.mobile__toggle} id="mobile__toggle">
                <input type="checkbox" name="" id="mob__toggle" />
                <label htmlFor="mob__toggle">
                    <IoReorderTwoOutline size={35} />
                </label>
            </div>
            <div className={styles.logo__area}>
                {/* <img src={icon} alt="logo" /> */}
                <h2>Osonwa.</h2>
            </div>
            <SearchBar show={{}} />
            <Nav className="nav" />
        </header>
    )
}

export default Header;