import { IoReorderTwoOutline } from "react-icons/io5"
import Nav from "./nav";
import SearchBar from "./search_bar";
import "../styles/header/header.module.css";
// import icon from "../styles/osonwapp.svg";

function Header() {
    return (
        <header>
            <div className="mobile__toggle" id="mobile__toggle">
                <input type="checkbox" name="" id="mob__toggle" />
                <label htmlFor="mob__toggle">
                    <IoReorderTwoOutline />
                </label>
            </div>
            <div className="logo__area">
                {/* <img src={icon} alt="logo" /> */}
                <h2>Osonwa.</h2>
            </div>
            <SearchBar />
            <Nav />
        </header>
    )
}

export default Header;