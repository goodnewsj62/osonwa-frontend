import { Carousel, NormalCard } from "components/others";
import AuthPopupModal from "components/others/AuthPopupModal";
import TagSlide from "components/others/carousel/TagsSlide";
import Main from "components/others/MainWrapper";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles/news.module.css";

function Feed(props) {
    const location = useLocation();
    const authCardInitialState = location.state && "loginPopStatus" in location.state && location.state.loginPopStatus ? true : false; // incase undefined
    const [authCardState, setAuthCardState] = useState(authCardInitialState);


    const hideAuthPopup = () => setAuthCardState((state) => !state);

    return (
        <Main >
            <section aria-label="carousel" className={styles.slider} >
                <Carousel />
            </section>
            <section aria-label="tags" className={`${styles.main__tags}`}>
                <TagSlide
                    tagArray={["python", "javascript", "backend", "frontend", "machine learning", "data science", "alorithm and data structure", "3d printing", "UI/UX", "Gaming", "Blockchain"]}
                    small={true}
                />
            </section>
            <MainCards />
            {authCardState && <AuthPopupModal hideHandler={hideAuthPopup} />}
        </Main>
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