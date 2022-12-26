import { useMemo, useState } from "react";
import SearchForm from "./SearchForm";



const SearchSaved = () => {
    const [inpContent, setInpContent] = useState("");

    const searchChangeHandler = (event) => {
        setInpContent(event.target.value)
    };

    const searchSubmitHandler = (event) => {

    };

    const searchDependencies = useMemo(() => { return { changeHandler: searchChangeHandler, handler: searchSubmitHandler, placeholder: "Search saved" } }, []);
    return (
        <SearchForm dependencies={searchDependencies} />
    )
};


export default SearchSaved;