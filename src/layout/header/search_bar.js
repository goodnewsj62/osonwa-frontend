import { BiSearch } from "react-icons/bi";
import styles from "../styles/header/searchbar.module.css";

function SearchBar(props){
    return(
        <div className={styles.search__bar}>
            <form onSubmit={(e) =>{}}>
                <input type="text" name="" id="" />
                <button  onClick={(e)=>{}}>
                    <BiSearch className="search__icon" size={16} />
                </button>
            </form>
        </div>
    )
}


export default SearchBar;