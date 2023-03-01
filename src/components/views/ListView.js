import ListCard from "components/others/cards/ListCard";
import ToggleContents from "components/others/ToggleContent";

import styles from "pages/styles/articles.module.css";


import { useFetchPage } from "components/profile/helpers/fetchHelper";
import useAuthAxios from "hooks/authAxios";
import useScrollState from "pages/hooks/scrollState";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { articlePostListAdapter, newsListAdapter } from "utils/adapters";
import { genFetchPost } from "utils/helpers";
import { baseAxiosInstance } from "utils/requests";
import RenderListView from "components/others/RenderList";




const ListView = ({ url }) => {
    const [selected, setSelected] = useState("news");
    const axios_ = useAuthAxios();
    const authState = useSelector((states) => states.authState);
    const [fetchedNews, setFetchedNews] = useState({ isLoading: true, others: {}, posts: [] });
    const [fetchedArticles, setFetchedArticles] = useState({ isLoading: true, others: {}, posts: [] });
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
        const newsUrl = url + "?type=news"
        const articleUrl = url + "?type=article"

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

    }, [authState, axios_, url]);

    const newsFeed = fetchedNews.posts.map((item) => {
        const info = newsListAdapter(item);
        return <ListCard info={info} key={item.id} />;
    });
    const articleFeed = fetchedArticles.posts.map((item) => {
        const info = articlePostListAdapter(item);
        return <ListCard info={info} key={item.id} />;
    });

    const styleClasses = `${styles.list__grid} ${styles.pad_sides_5}`;
    const newsCards = <RenderListView posts={newsFeed} isLoading={fetchedNews.isLoading}
        isFetchingNext={isLoadingNews} classes={styleClasses}
        message={"Oops no posts was retrieved"} />;
    const articlesCards = <RenderListView posts={articleFeed} isLoading={fetchedArticles.isLoading}
        isFetchingNext={isLoadingArticles} classes={styleClasses}
        message={"Oops no posts was retrieved"} />;


    const onScreen = (value) => setSelected(value);
    const contentNames = useMemo(() => ["news", "articles"], []);
    const components = [newsCards, articlesCards];

    return (
        <ToggleContents stateNames={contentNames} components={components} callback={onScreen} />
    );
};


export default ListView;