import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styles from "./styles/searchbar.module.css";

function SearchBar({ visibilityState }) {
    const [showMobBarClass, setShowMobBarClass] = useState("")
    const { toggleMobileSearch, toggleMobSearch } = visibilityState;
    const inpRef = useRef();
    const navigate = useNavigate();

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
            <form onSubmit={(e) => {
                e.preventDefault()
                navigate(`search/?q=${inpRef.current.value}`);
            }}>
                <input ref={inpRef} placeholder="search" type="text" name="search" id="search" />
                <button type="submit">
                    <BiSearch className="search__icon" size={16} />
                </button>
            </form>
        </div>
    )
}


export default SearchBar;