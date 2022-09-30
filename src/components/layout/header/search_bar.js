import { BiSearch } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import styles from "../styles/header/searchbar.module.css";

function SearchBar(props) {
    return (
        <div className={styles.search__bar}>
            <button type="button">
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