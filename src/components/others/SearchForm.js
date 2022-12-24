import { useContext, useState} from "react";
import { BiSearch } from "react-icons/bi";

import { DefaultIconSize } from "components/wrappers/IconSize";
import styles from "./styles/searchf.module.css";


const SearchForm=  ({dependencies: {handler,changeHandler, placeholder}})=>{
    const [input, setInput] = useState("");
    const iconSize =  useContext(DefaultIconSize);

    const inputHandler =  (e)=>{
        if(typeof changeHandler ===  "function") changeHandler(e);
        setInput(e.target.value);
    };
    const customSubHandler =  (e)=> handler(e, input);

    // change function if it exists should store value inputed
    const submitHandler = typeof changeHandler ===  "function"? handler : customSubHandler;

    return(
        <form onSubmit={submitHandler} className={styles.form} >
            <span>
                <button type="submit">
                    <BiSearch size={iconSize}/>
                </button>
            </span>
            <div className={styles.label__div}>
                <label id="gensearch__label"
                    htmlFor="general__search">
                        {placeholder}
                </label>
            </div>
            <div  className={styles.border__div}>
                <div className={``}></div>
            </div>
            <input type="text" 
                autoComplete="off" 
                autoCorrect="off" 
                id="general__search"
                aria-labelledby="gensearch__label"
                onChange={inputHandler}
                value={input}
            />
        </form>
    )
};


export default SearchForm;
