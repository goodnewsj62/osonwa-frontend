import ListCard from "components/others/cards/ListCard";
import Main from "components/others/MainWrapper";
import styles from "./styles/articles.module.css";

function Articles(props) {
    const article_feed = [1,2,3].map((each)=>{
        return <ListCard />
    });
    return (
        <Main >
            <section aria-label="articles"  className={`${styles.articles}`}>
                {article_feed}
            </section>
        </Main>
    )
}


export default Articles;