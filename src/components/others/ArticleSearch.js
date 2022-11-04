
import { useRef } from "react";
import {BiSearch} from "react-icons/bi";
import {IoCloseSharp} from "react-icons/io5";
import styles from "./styles/articlesearch.module.css";


const ArticleSearch =  (props)=>{
    const formRef =  useRef();
    const toggleSearch=  (event)=>{
        formRef.current.classList.toggle(`${styles.show__search}`);
    };

    return(
        <div className={styles.style__search}>
            <div onClick={toggleSearch} className={styles.search__icon}>
                <BiSearch size={22} />
            </div>
            <form ref={formRef} action="">
                <button onClick={toggleSearch} className={styles.slide__in} type="button">
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