
import { IoReorderTwoOutline } from "react-icons/io5"
import Nav from "./Nav";
import SearchBar from "./Search_bar";

import styles from "./styles/header.module.css";
import "./styles/header.css";
import { useDispatch } from "react-redux";
import sideBarActions from "store/SideBarSlice";
// import icon from "../styles/osonwapp.svg";

function Header() {
    const dispatch = useDispatch();

    const toggleSideBarHandler = (event) => {
        dispatch(sideBarActions.toggleState());
    };

    return (
        <header>
            <div className={styles.mobile__toggle} id="mobile__toggle">
                <input type="checkbox" name="" id="mob__toggle" />
                <label onClick={toggleSideBarHandler} htmlFor="mob__toggle">
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