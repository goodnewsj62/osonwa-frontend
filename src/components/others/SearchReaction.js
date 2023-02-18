import { useFetchPage } from "components/profile/helpers/fetchHelper";
import useAuthAxios from "hooks/authAxios";
import useScrollState from "pages/hooks/scrollState";
import { memo, useCallback, useEffect, useMemo } from "react";
import { genFetchPost } from "utils/helpers";
import SearchForm from "./SearchForm";



const SearchReactions = ({
    newsSearchResult,
    articleSearchResult,
    setResultNews,
    setResultsPost,
    setNewsValue,
    setPostValue,
    newsValue,
    postValue,
    selected,
    setIsLoadingNews,
    setIsLoadingArticle, urlBase }) => {

    const axios_ = useAuthAxios();


    const newsSelected = useCallback(() => selected === "news" && newsValue.length !== 0, [selected, newsValue]);
    const fetchNewsNextPage = useFetchPage(newsSearchResult, setResultNews, setIsLoadingNews, newsSelected);
    useScrollState(fetchNewsNextPage);


    const articleSelected = useCallback(() => selected === "articles" && postValue.length !== 0, [selected, postValue]);
    const fetchArticleNextPage = useFetchPage(articleSearchResult, setResultsPost, setIsLoadingArticle, articleSelected);
    useScrollState(fetchArticleNextPage);

    const fetchPost = useCallback(genFetchPost, []);


    useEffect(() => {
        if (selected === "news") {
            const url = urlBase + `?type=news&q=${newsValue}`;
            fetchPost(url, setResultNews, axios_);
        } else {
            const url = urlBase + `?type=article&q=${postValue}`;
            fetchPost(url, setResultsPost, axios_);
        }
    }, [fetchPost,
        axios_,
        selected,
        urlBase,
        setResultNews,
        setResultsPost,
        newsValue,
        postValue]);

    const searchChangeHandler = useCallback((event) => {
        if (selected === "news") {
            setNewsValue(event.target.value);
        } else {
            setPostValue(event.target.value);
        }
    }, [selected, setPostValue, setNewsValue]);

    const searchSubmitHandler = useCallback((event) => { event.preventDefault(); }, [])

    const searchDependencies = useMemo(() => { return { changeHandler: searchChangeHandler, handler: searchSubmitHandler, placeholder: "Search saved" } }, [searchSubmitHandler, searchChangeHandler]);
    return (
        <SearchForm dependencies={searchDependencies} />
    )
};


export default memo(SearchReactions);