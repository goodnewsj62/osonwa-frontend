import ArticleSearch from "components/others/ArticleSearch";
import ListCard from "components/others/cards/ListCard";
import Main from "components/others/MainWrapper";
import SortPanel from "components/others/SortPanel";
import styles from "./styles/articles.module.css";

function Articles(props) {
    const article_feed = [1,2,3].map((each)=>{
        return <ListCard />
    });
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
            <section aria-label="articles"  className={`${styles.articles}`}>
                {article_feed}
            </section>
        </Main>
    )
}


export default Articles;