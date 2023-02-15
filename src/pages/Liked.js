import ListCard from "components/others/cards/ListCard";
import Main from "components/others/MainWrapper";
import SearchLiked from "components/others/SearchLike";
import ToggleContents from "components/others/ToggleContent";
import useAuthAxios from "hooks/authAxios";
import { useCallback, useEffect, useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { articlePostListAdapter, newsListAdapter } from "utils/adapters";


import cardStyles from "./styles/articles.module.css";
import styles from "./styles/fav.module.css";

const Liked = () => {
    const [fetchedArticles, setFetchedArticles] = useState({ isLoading: true, others: {}, posts: [] });
    const [fetchedNews, setFetchedNews] = useState({ isLoading: true, others: {}, posts: [] });
    const userInfo = useSelector((states) => states.profileState.userInfo)
    const axios_ = useAuthAxios();


    const fetchPost = useCallback(async (type) => {
        try {
            const url = `/liked/${userInfo.id}/?type=${type}`;
            const resp = await axios_.get(url);
            const { results, ...others } = resp.data.data;

            if (type === "article") setFetchedArticles({ isLoading: false, others: others, posts: results });
            else setFetchedNews({ isLoading: false, others: others, posts: results });

            return resp;
        } catch (err) {
            if (type === "article") setFetchedArticles((state) => ({ ...state, isLoading: false }));
            else setFetchedNews((state) => ({ ...state, isLoading: false }));
        }

    }, [axios_, userInfo.id]);

    useEffect(() => {
        Promise.all([fetchPost("article"), fetchPost("news")]);
    }, [fetchPost]);



    const articles = fetchedArticles.posts.map((item) => {
        const info = articlePostListAdapter(item.content_object)
        return <ListCard info={info} key={item.id} />
    });

    const news = fetchedNews.posts.map((item) => {
        const info = newsListAdapter(item.content_object)
        return <ListCard info={info} key={item.id} />
    });

    const likedArticles = <section aria-label="liked article" className={cardStyles.articles}>{articles}</section>;
    const likedNews = <section aria-label="liked news" className={cardStyles.articles}>{news}</section>;

    const contentNames = useMemo(() => ["news", "articles"], []);
    const components = [likedNews, likedArticles];

    const onScreen = () => { };


    return (
        <Main>
            <div className={styles.container}>
                <section className={styles.main__content}>
                    <h1>Liked</h1>
                    <div className={styles.list__container}>
                        <ToggleContents stateNames={contentNames} components={components} callback={onScreen} />
                    </div>
                </section>

                <section className={styles.aside}>
                    <h1>Liked</h1>
                    <div className={styles.search__div}>
                        <SearchLiked />
                    </div>
                </section>
            </div>
        </Main>
    );
};

export default Liked;