import { Carousel, NormalCard, Tags } from "components/others";
import { useSelector } from "react-redux";
import styles from "./styles/news.module.css";

function Feed(props) {
    const barState = useSelector((state) => state.sideBarState);

    const main_classes = barState ? `main ${styles.futher__left}` : `main`;
    return (
        <main className={main_classes}>
            <section aria-label="carousel" className={styles.slider} >
                <Carousel />
            </section>
            <section aria-label="tags" className={`${styles.main__tags}`}>
                <Tags />
            </section>
            <MainCards />
        </main>
    );
};

function MainCards(props) {
    return (
        <section aria-label="news" className={`news ${styles.main__content}`}>
            <h4>News feed</h4>
            <div className={`main__grid ${styles.cards}`}>
                <NormalCard />
                <NormalCard />
                <NormalCard />
                <NormalCard />
            </div>
        </section>
    )
}


export default Feed;