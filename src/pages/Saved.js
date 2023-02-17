import ListCard from "components/others/cards/ListCard";
import Main from "components/others/MainWrapper";
import SearchSaved from "components/others/SavedSearch";
import ToggleContents from "components/others/ToggleContent";
import RenderListView from "components/others/RenderList";
import { useFetchPage } from "components/profile/helpers/fetchHelper";
import useAuthAxios from "hooks/authAxios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { articlePostListAdapter, newsListAdapter } from "utils/adapters";
import { genFetchPost } from "utils/helpers";
import useScrollState from "./hooks/scrollState";


import styles from "./styles/fav.module.css";





const Saved = () => {
    const [selected, setSelected] = useState("");
    const [fetchedArticles, setFetchedArticles] = useState({ isLoading: true, others: {}, posts: [] });
    const [fetchedNews, setFetchedNews] = useState({ isLoading: true, others: {}, posts: [] });
    const [isLoadingNews, setIsLoadingNews] = useState(false);
    const [isLoadingArticle, setIsLoadingArticle] = useState(false);


    const userInfo = useSelector((states) => states.profileState.userInfo)
    const axios_ = useAuthAxios();


    const newsSelected = useCallback(() => selected === "news", [selected]);
    const fetchNewsNextPage = useFetchPage(fetchedNews, setFetchedNews, setIsLoadingNews, newsSelected);
    useScrollState(fetchNewsNextPage);


    const articleSelected = useCallback(() => selected === "articles", [selected]);
    const fetchArticleNextPage = useFetchPage(fetchedArticles, setFetchedArticles, setIsLoadingArticle, articleSelected);
    useScrollState(fetchArticleNextPage);

    const fetchPost = useCallback(genFetchPost, []);


    useEffect(() => {
        const articlesURL = `/saved/${userInfo.id}/?type=article`;
        const newsURL = `/saved/${userInfo.id}/?type=news`;
        Promise.all([
            fetchPost(articlesURL, setFetchedArticles, axios_),
            fetchPost(newsURL, setFetchedNews, axios_)
        ]);
    }, [fetchPost, userInfo.id, axios_]);

    const articles = fetchedArticles.posts.map((item) => {
        const info = articlePostListAdapter(item.content_object)
        return <ListCard info={info} key={item.id} />
    });

    const news = fetchedNews.posts.map((item) => {
        const info = newsListAdapter(item.content_object)
        return <ListCard info={info} key={item.id} />
    });

    const savedArticles = <RenderListView posts={articles} isLoading={fetchedArticles.isLoading}
        isFetchingNext={isLoadingArticle}
        message={"Seems you have not liked any post yet"} />;
    const savedNews = <RenderListView posts={news} isLoading={fetchedNews.isLoading}
        isFetchingNext={isLoadingNews}
        message={"Seems you have not liked any post yet"} />;

    const contentNames = useMemo(() => ["news", "articles"], []);
    const components = [savedNews, savedArticles]

    const onScreen = (value) => setSelected(value);


    return (
        <Main>
            <div className={styles.container}>
                <section className={styles.main__content}>
                    <h1>Saved</h1>
                    <div className={styles.list__container}>
                        <ToggleContents stateNames={contentNames} components={components} callback={onScreen} />
                    </div>
                </section>

                <section className={styles.aside}>
                    <h1>Saved</h1>
                    <div className={styles.search__div}>
                        <SearchSaved />
                    </div>
                </section>
            </div>
        </Main>
    );
};

export default Saved;