import ArticleSearch from "components/others/ArticleSearch";
import ListCard from "components/others/cards/ListCard";
import Main from "components/others/MainWrapper";
import SortPanel from "components/others/SortPanel";
import ToggleContents from "components/others/ToggleContent";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./styles/articles.module.css";

function Articles(props) {
    const [articleType, setArticleType] = useState("aggregate");
    const article_feed = [1, 2, 3].map((each) => {
        return <ListCard />
    });

    const internalArticles = <section aria-label="articles" className={`${styles.articles}`}>{[article_feed[1]]}</section>;
    const curratedArticles = <section aria-label="articles" className={`${styles.articles}`}>{article_feed}</section>;
    const components = useMemo(() => [curratedArticles, internalArticles], []);
    const stateNames = useMemo(() => ["aggregate", "internal"], []);

    const onScreen = useCallback((name) => setArticleType(name), []);

    return (
        <Main >
            <section className={styles.article__head} aria-labelledby="head">
                <h1 id="head">
                    Articles
                </h1>
                <div className={styles.sort__panel}>
                    <ArticleSearch />
                    <SortPanel />
                </div>
            </section>
            <ToggleContents stateNames={stateNames} components={components} callback={onScreen} />
        </Main>
    )
}


export default Articles;