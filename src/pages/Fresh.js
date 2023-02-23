import { useCallback, useEffect, useMemo, useState } from "react";
import Main from "components/others/MainWrapper";
import ToggleContents from "components/others/ToggleContent";
import RenderListView from "components/others/RenderList";

import styles from "./styles/articles.module.css";
import { genFetchPost } from "utils/helpers";
import { baseAxiosInstance } from "utils/requests";
import useAuthAxios from "hooks/authAxios";
import { useSelector } from "react-redux";
import useScrollState from "./hooks/scrollState";
import { useFetchPage } from "components/profile/helpers/fetchHelper";
import ListCard from "components/others/cards/ListCard";
import { articlePostListAdapter, newsListAdapter } from "utils/adapters";



const Fresh = () => {
    const [selected, setSelected] = useState("news");
    const axios_ = useAuthAxios();
    const authState = useSelector((states) => states.authState);
    const [fetchedNews, setFetchedNews] = useState({ isLoading: false, others: {}, posts: [] });
    const [fetchedArticles, setFetchedArticles] = useState({ isLoading: false, others: {}, posts: [] });
    const [isLoadingNews, setIsLoadingNews] = useState(true);
    const [isLoadingArticles, setIsLoadingArticles] = useState(true);


    const newsSelected = useCallback(() => selected === "news", [selected]);
    const fetchNewsNextPage = useFetchPage(fetchedNews, setFetchedNews, setIsLoadingNews, newsSelected);
    useScrollState(fetchNewsNextPage);

    const articleSelected = useCallback(() => selected === "articles", [selected]);
    const fetchArticleNextPage = useFetchPage(fetchedArticles, setFetchedArticles, setIsLoadingArticles, articleSelected);
    useScrollState(fetchArticleNextPage);

    useEffect(() => {
        const fetchPost_ = genFetchPost
        const newsUrl = "/fresh/?type=news"
        const articleUrl = "/fresh/?type=article"

        if (authState.state) {
            Promise.all(
                [
                    fetchPost_(newsUrl, setFetchedNews, axios_, () => setIsLoadingNews(false)),
                    fetchPost_(articleUrl, setFetchedArticles, axios_, () => setIsLoadingArticles(false))
                ]
            )
        } else {
            Promise.all(
                [
                    fetchPost_(newsUrl, setFetchedNews, baseAxiosInstance, () => setIsLoadingNews(false)),
                    fetchPost_(articleUrl, setFetchedArticles, baseAxiosInstance, () => setIsLoadingArticles(false))
                ]
            )
        }

    }, [authState, axios_]);

    const newsFeed = fetchedNews.posts.map((item) => {
        const info = newsListAdapter(item);
        return <ListCard info={info} key={item.id} />;
    });
    const articleFeed = fetchedArticles.posts.map((item) => {
        const info = articlePostListAdapter(item);
        return <ListCard info={info} key={item.id} />;
    });


    const newsCards = <RenderListView posts={newsFeed} isLoading={fetchedNews.isLoading}
        isFetchingNext={isLoadingNews} classes={styles.pad_sides_5}
        message={"Oops no posts was retrieved"} />;
    const articlesCards = <RenderListView posts={articleFeed} isLoading={fetchedArticles.isLoading}
        isFetchingNext={isLoadingArticles} classes={styles.pad_sides_5}
        message={"Oops no posts was retrieved"} />;


    const onScreen = (value) => setSelected(value);
    const contentNames = useMemo(() => ["news", "articles"], []);
    const components = [newsCards, articlesCards];

    return (
        <Main>
            <h1 className={styles.page__header}>Fresh</h1>
            <ToggleContents stateNames={contentNames} components={components} callback={onScreen} />
        </Main>
    );
};


export default Fresh;