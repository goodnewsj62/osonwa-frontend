
import {BiSearch} from "react-icons/bi";
import {IoCloseSharp} from "react-icons/io5";
import styles from "./styles/articlesearch.module.css";


const ArticleSearch =  (props)=>{
    return(
        <div className={styles.style__search}>
            <div className={styles.search__icon}>
                <BiSearch size={22} />
            </div>
            <form action="">
                <button className={styles.slide__in} type="button">
                    <IoCloseSharp size={18} />
                </button>
                <input type="text" placeholder="search article" />
                <button type="submit">
                    <BiSearch  size={18} />
                </button>
            </form>
        </div>
    )
};


export default ArticleSearch;