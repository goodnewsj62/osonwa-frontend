import ListCard from "components/others/cards/ListCard";
import Main from "components/others/MainWrapper";
import SearchLiked from "components/others/SearchLike";
import ToggleContents from "components/others/ToggleContent";
import { useMemo } from "react";


import cardStyles from "./styles/articles.module.css";
import styles from "./styles/fav.module.css";

const Liked = () => {
    const fetchedArticles = [1, 2, 3].map((item) => {
        return <ListCard />
    });

    const likedArticles = <section aria-label="liked article" className={cardStyles.articles}>{fetchedArticles}</section>;
    const likedNews = <section aria-label="liked news" className={cardStyles.articles}>{[fetchedArticles[0]]}</section>;

    const contentNames = useMemo(() => ["news", "articles"], []);
    const components = useMemo(() => [likedNews, likedArticles], []);

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