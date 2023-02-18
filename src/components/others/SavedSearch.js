import { memo, useMemo, useState } from "react";
import SearchForm from "./SearchForm";



const SearchSaved = ({ setResultNews,
    setResultsPost,
    setNewsValue,
    setPostValue,
    newsValue,
    postValue,
    selected }) => {

    const searchChangeHandler = (event) => {
    };

    const searchSubmitHandler = (event) => {

    };

    const searchDependencies = useMemo(() => { return { changeHandler: searchChangeHandler, handler: searchSubmitHandler, placeholder: "Search saved" } }, []);
    return (
        <SearchForm dependencies={searchDependencies} />
    )
};


export default memo(SearchSaved);