import { Link } from "react-router-dom";
import { IoReorderTwoOutline } from "react-icons/io5"
import Nav from "./Nav";
import SearchBar from "./Search_bar";

import styles from "./styles/header.module.css";
import "./styles/header.css";
import { useDispatch } from "react-redux";
import sideBarActions from "store/SideBarSlice";
import { useState } from "react";
import icon from "icons/logo.png";

function Header() {
    const [toggleMobSearch, setToggleMobSearch] = useState(false);
    const dispatch = useDispatch();

    const toggleSideBarHandler = (event) => {
        dispatch(sideBarActions.toggleState());
    };

    const toggleMobileSearch = (state) => {
        setToggleMobSearch(state);
    };

    const visibilityState = { toggleMobileSearch, toggleMobSearch }

    return (
        <header>
            <div className={styles.mobile__toggle} id="mobile__toggle">
                <input type="checkbox" name="" id="mob__toggle" />
                <label onClick={toggleSideBarHandler} htmlFor="mob__toggle">
                    <IoReorderTwoOutline size={35} />
                </label>
            </div>
            <div className={styles.logo__area}>
                <Link to="/">
                    <img src={icon} alt="logo" />
                    <h2>sonwa.</h2>
                </Link >
            </div>
            <SearchBar visibilityState={visibilityState} />
            <Nav showSearch={setToggleMobSearch} />
        </header>
    )
}

export default Header;