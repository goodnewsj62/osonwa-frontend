import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./styles/searchbar.module.css";

function SearchBar({ visibilityState }) {
    const [showMobBarClass, setShowMobBarClass] = useState("")
    const { toggleMobileSearch, toggleMobSearch } = visibilityState;

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 800 && toggleMobSearch) {
            setShowMobBarClass(styles.show__mobbar)
        } else {
            setShowMobBarClass("")
        }
    }, [toggleMobSearch]);


    return (
        <div className={`${styles.search__bar} ${showMobBarClass}`}>
            <button onClick={() => { toggleMobileSearch(false) }} type="button">
                <IoIosArrowBack size={20} />
            </button>
            <form onSubmit={(e) => { }}>
                <input type="text" name="" id="" />
                <button type="submit" onClick={(e) => { }}>
                    <BiSearch className="search__icon" size={16} />
                </button>
            </form>
        </div>
    )
}


export default SearchBar;