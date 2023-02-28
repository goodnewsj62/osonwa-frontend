
import { useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import styles from "./styles/articlesearch.module.css";


const ArticleSearch = ({ setSearch }) => {
    const formRef = useRef();
    const inputRef = useRef();

    const toggleSearch = (event) => {
        formRef.current.classList.toggle(`${styles.show__search}`);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setSearch({ status: true, value: inputRef.current.value });
    };

    return (
        <div className={styles.style__search}>
            <div onClick={toggleSearch}
                className={styles.search__icon}>
                <BiSearch size={22} />
            </div>
            <form ref={formRef} onSubmit={submitHandler}>
                <button onClick={(e) => {
                    toggleSearch(e);
                    setSearch({ status: false, value: "" });
                }} className={styles.slide__in} type="button">
                    <IoCloseSharp size={18} />
                </button>
                <input ref={inputRef} type="text" placeholder="search article" />
                <button type="submit">
                    <BiSearch size={18} />
                </button>
            </form>
        </div>
    )
};


export default ArticleSearch;