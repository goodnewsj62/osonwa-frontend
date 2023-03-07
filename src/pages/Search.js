import { useFetchPage } from "components/profile/helpers/fetchHelper";
import useAuthAxios from "hooks/authAxios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import useScrollState from "./hooks/scrollState";
import { genFetchPost } from "utils/helpers";
import ListCard from "components/others/cards/ListCard";
import { articlePostListAdapter, newsListAdapter } from "utils/adapters";
import ToggleContents from "components/others/ToggleContent";
import RenderListView from "components/others/RenderList";
import styles from "pages/styles/articles.module.css";
import Main from "components/others/MainWrapper";






const Search = () => {
    const [selected, setSelected] = useState("news");
    const axios_ = useAuthAxios();
    const location = useLocation();
    const [results, setResult] = useState({ isLoading: true, others: {}, posts: [] });
    const [isLoading, setIsloading] = useState(false);
    const [searchValue, setSearchValue] = useState("")

    const fetchNewsNextPage = useFetchPage(results, setResult, setIsloading);
    useScrollState(fetchNewsNextPage);

    useEffect(() => {
        const match_ = location.search.match(/q=.*\b/);
        if (!match_) return;

        const qs = match_[0].split("&");

        const searchVal = qs.find((value) => value.startsWith("q="));

        const search_ = searchVal.split("=")[1];
        setSearchValue(search_);

        genFetchPost(`/search/?${searchVal}`, setResult, axios_);
    }, [location, axios_, setSearchValue])

    const componentArr = useCallback(() => {
        const news = [];
        const articles = [];

        if (results.posts.length < 1 || results.isLoading) {
            return [[], []];
        }

        for (let i = 0; i < results.posts.length; i++) {
            const post = results.posts[i];
            if (post.m_name === "news") {
                const info = newsListAdapter(post);
                news.push(<ListCard info={info} key={post.id} />)
            } else {
                const info = articlePostListAdapter(post);
                articles.push(<ListCard info={info} key={post.id} />)
            }
        }

        return [news, articles, results.isLoading];
    }, [results])



    const styleClasses = `${styles.list__grid} ${styles.pad_sides_5}`;
    const newsCards = <RenderListView posts={componentArr()[0]} isLoading={results.isLoading}
        isFetchingNext={isLoading} classes={styleClasses}
        message={"no news found"} />;
    const articlesCards = <RenderListView posts={componentArr()[1]} isLoading={results.isLoading}
        isFetchingNext={isLoading} classes={styleClasses}
        message={"no articles found"} />;


    const onScreen = (value) => setSelected(value);
    const contentNames = useMemo(() => ["news", "articles"], []);
    const components = [newsCards, articlesCards];

    return (
        <Main>
            <h1 style={{ padding: "1rem", fontSize: "1.8rem", color: "var(--mode-write-color)" }}>Results for {searchValue}</h1>
            <ToggleContents stateNames={contentNames} components={components} callback={onScreen} />
        </Main>
    );
};


export default Search;