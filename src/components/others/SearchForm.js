import { useContext, useState} from "react";
import { BiSearch } from "react-icons/bi";

import { DefaultIconSize } from "components/wrappers/IconSize";
import styles from "./styles/searchf.module.css";
import { useRef } from "react";


const SearchForm=  ({dependencies: {handler,changeHandler, placeholder}})=>{
    const [input, setInput] = useState("");
    const iconSize =  useContext(DefaultIconSize);
    const underline =  useRef();

    const inputHandler =  (e)=>{
        if(typeof changeHandler ===  "function") changeHandler(e);
        setInput(e.target.value);
    };
    const customSubHandler =  (e)=> handler(e, input);
    const borderHighlight = (e)=> underline.current.classList.add(`${styles.highlight}`);
    const unHighlight = (e)=> underline.current.classList.remove(`${styles.highlight}`);

    // change function if it exists should store value inputed
    const submitHandler = typeof changeHandler ===  "function"? handler : customSubHandler;
    const labelClasses =  input === ""? `${styles.label__div}`:`${styles.label__div} ${styles.hide__label}`;



    return(
        <form onSubmit={submitHandler} className={styles.form} >
            <div className={styles.input}>
                <span className={styles.button}>
                    <button type="submit">
                        <BiSearch size={iconSize}/>
                    </button>
                </span>
                <div className={labelClasses}>
                    <label id="gensearch__label" htmlFor="general__search">
                        {placeholder}
                    </label>
                </div>
                <input type="text" 
                    autoComplete="off" 
                    autoCorrect="off" 
                    id="general__search"
                    aria-labelledby="gensearch__label"
                    onChange={inputHandler}
                    onFocus={borderHighlight}
                    onBlur={unHighlight}
                    value={input}
                />
            </div>
            <div  ref={underline} className={styles.underline}>
                <div className={``}></div>
            </div>
        </form>
    )
};


export default SearchForm;
