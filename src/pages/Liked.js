import Main from "components/others/MainWrapper";
import ToggleContents from "components/others/ToggleContent";
import RenderListView from "components/others/RenderList";
import SearchReactions from "components/others/SearchReaction";
import { useFetchPage } from "components/profile/helpers/fetchHelper";
import useAuthAxios from "hooks/authAxios";
import { useCallback, useEffect, useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useScrollState from "pages/hooks/scrollState";

import styles from "./styles/fav.module.css";
import { genFetchPost } from "utils/helpers";
import { createNewsCardList, createPostsCardList, getAppropriateComponentArray } from "./helpers/likeSaveHelper";

const Liked = () => {
    const [selected, setSelected] = useState("news");
    const [fetchedArticles, setFetchedArticles] = useState({ isLoading: true, others: {}, posts: [] });
    const [fetchedNews, setFetchedNews] = useState({ isLoading: true, others: {}, posts: [] });
    const [searchResultsNews, setSearchResultsNews] = useState({ isLoading: true, others: {}, posts: [] });
    const [searchTextNews, setSearchTextNews] = useState("");
    const [searchResultsPost, setSearchResultsPost] = useState({ isLoading: true, others: {}, posts: [] });
    const [searchTextPost, setSearchTextPost] = useState("");
    const [isLoadingNews, setIsLoadingNews] = useState(false);
    const [isLoadingArticle, setIsLoadingArticle] = useState(false);



    const userInfo = useSelector((states) => states.profileState.userInfo)
    const axios_ = useAuthAxios();


    const newsSelected = useCallback(() => selected === "news" && searchTextNews.length === 0, [selected, searchTextNews]);
    const fetchNewsNextPage = useFetchPage(fetchedNews, setFetchedNews, setIsLoadingNews, newsSelected);
    useScrollState(fetchNewsNextPage);


    const articleSelected = useCallback(() => selected === "articles" && searchTextPost.length === 0, [selected, searchTextPost]);
    const fetchArticleNextPage = useFetchPage(fetchedArticles, setFetchedArticles, setIsLoadingArticle, articleSelected);
    useScrollState(fetchArticleNextPage);


    // const fetchPost = useCallback(genFetchPost, []);

    useEffect(() => {
        const articlesURL = `/liked/${userInfo.id}/?type=article`;
        const newsURL = `/liked/${userInfo.id}/?type=news`;
        Promise.all([
            genFetchPost(articlesURL, setFetchedArticles, axios_),
            genFetchPost(newsURL, setFetchedNews, axios_)
        ]);
    }, [userInfo.id, axios_]);




    const messageHandler = useCallback((type) => {
        const stateSetters = {
            news: setFetchedNews,
            article: setFetchedArticles,
        }

        const setter = stateSetters[type];

        return (value, id_) => {
            if (value === "unlike") {
                setter((state) => {
                    return {
                        ...state,
                        posts: state.posts.filter((item) => item.content_object.id !== id_)
                    }
                });
            }
        }
    }, []);

    const articles = createPostsCardList(fetchedArticles.posts, messageHandler, setFetchedNews, setFetchedArticles);
    const searchedPosts = createPostsCardList(searchResultsPost.posts, messageHandler, setSearchResultsNews, setSearchResultsPost);

    const news = createNewsCardList(fetchedNews.posts, messageHandler, setFetchedNews, setFetchedArticles);
    const searchedNews = createNewsCardList(searchResultsNews.posts, messageHandler, setSearchResultsNews, setSearchResultsPost);


    //add loading component
    const likedArticles = <RenderListView posts={articles} isLoading={fetchedArticles.isLoading}
        isFetchingNext={isLoadingArticle}
        message={"Seems you have not liked any post yet"} />;
    const likedArticlesSearch = <RenderListView posts={searchedPosts} isLoading={searchResultsPost.isLoading}
        isFetchingNext={isLoadingArticle}
        message={"Opps! No posts found"} />;

    const likedNews = <RenderListView posts={news} isLoading={fetchedNews.isLoading}
        isFetchingNext={isLoadingNews}
        message={"Seems you have not liked any post yet"} />;
    const likedNewsSearch = <RenderListView posts={searchedNews} isLoading={searchResultsNews.isLoading}
        isFetchingNext={isLoadingNews}
        message={"Opps! No posts found"} />;

    const contentNames = useMemo(() => ["news", "articles"], []);
    const components = getAppropriateComponentArray(
        searchTextNews, searchTextPost, selected,
        [likedNews, likedArticles],
        [likedArticlesSearch, likedNewsSearch]);


    const onScreen = (value) => setSelected(value);


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
                        <SearchReactions
                            newsSearchResult={searchResultsNews}
                            articleSearchResult={searchResultsPost}
                            setResultNews={setSearchResultsNews}
                            setResultsPost={setSearchResultsPost}
                            setNewsValue={setSearchTextNews}
                            setPostValue={setSearchTextPost}
                            setIsLoadingNews={setIsLoadingNews}
                            setIsLoadingArticle={setIsLoadingArticle}
                            newsValue={searchTextNews}
                            postValue={searchTextPost}
                            selected={selected}
                            urlBase={"/search/like/"}
                        />
                    </div>
                </section>
            </div>
        </Main>
    );
};

export default Liked;