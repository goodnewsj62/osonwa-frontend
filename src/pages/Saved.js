import ListCard from "components/others/cards/ListCard";
import Main from "components/others/MainWrapper";
import SearchSaved from "components/others/SavedSearch";
import ToggleContents from "components/others/ToggleContent";
import { useMemo } from "react";


import cardStyles from "./styles/articles.module.css";
import styles from "./styles/fav.module.css";





const Saved = () => {

    const fetchedArticles = [1, 2, 3].map((item) => {
        return <ListCard />
    });

    const savedArticles = <section aria-label="saved article" className={cardStyles.articles}>{fetchedArticles}</section>;
    const savedNews = <section aria-label="saved article" className={cardStyles.articles}>{[fetchedArticles[0]]}</section>;

    const contentNames = useMemo(() => ["news", "articles"], []);
    const components = useMemo(() => [savedNews, savedArticles], []);

    const onScreen = () => { };


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