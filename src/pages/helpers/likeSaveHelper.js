import ListCard from "components/others/cards/ListCard";
import { articlePostListAdapter, newsListAdapter } from "utils/adapters";


export const removePost = (type, setFetchedNews, setFetchedArticles) => {
    const stateSetters = {
        news: setFetchedNews,
        article: setFetchedArticles,
    }

    const setter = stateSetters[type];

    return (value, id_) => {
        if (value === "unsave") {
            setter((state) => {
                return {
                    ...state,
                    posts: state.posts.filter((item) => item.content_object.id !== id_)
                }
            });
        }
    }
}

export const createPostsCardList = (posts, messageHandler, setFetchedNews, setFetchedArticles) => {
    return posts.map((item) => {
        const info = articlePostListAdapter(item.content_object);
        info["messageCallback"] = messageHandler("article", setFetchedNews, setFetchedArticles);
        return <ListCard info={info} key={item.id} />;
    });
};
export const createNewsCardList = (posts, messageHandler, setFetchedNews, setFetchedArticles) => {
    return posts.map((item) => {
        const info = newsListAdapter(item.content_object);
        info["messageCallback"] = messageHandler("news", setFetchedNews, setFetchedArticles);
        return <ListCard info={info} key={item.id} />;
    });
};


export const getAppropriateComponentArray = (newsSearchInp, articleSearchInput, selected, components, searchResultsComp) => {
    const [savedNews, savedArticle] = components;
    const [savedArticlesSearchComp, savedNewsSearchComp] = searchResultsComp;
    if (newsSearchInp.trim().length !== 0 && selected === "news" && articleSearchInput.trim().length === 0) {
        return [savedNewsSearchComp, savedArticle]; //newsSearchedFor | normal article;
    } else if (articleSearchInput.trim().length !== 0 && selected === "articles" && newsSearchInp.trim().length === 0) {
        return [savedNews, savedArticlesSearchComp];
    } else if (articleSearchInput.trim().length !== 0 && newsSearchInp.trim().length !== 0) {
        return [savedNewsSearchComp, savedArticlesSearchComp];
    }
    return components;
};