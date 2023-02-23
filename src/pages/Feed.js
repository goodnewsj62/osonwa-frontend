import { Carousel, NormalCard, SpreadLoader } from "components/others";
import AuthPopupModal from "components/others/AuthPopupModal";
import TagSlide from "components/others/carousel/TagsSlide";
import Main from "components/others/MainWrapper";
import MessagePopupModal from "components/others/MessagePopupModal";
import { useFetchPage } from "components/profile/helpers/fetchHelper";
import useAuthAxios from "hooks/authAxios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { genFetchPost } from "utils/helpers";
import { baseAxiosInstance } from "utils/requests";
import useScrollState from "./hooks/scrollState";
import styles from "./styles/news.module.css";

function Feed(props) {
    const location = useLocation();
    const authCardInitialState = location.state && "loginPopStatus" in location.state && location.state.loginPopStatus ? true : false; // incase undefined
    const [authCardState, setAuthCardState] = useState(authCardInitialState);
    const [message, setMessage] = useState({ status: false, message: "" });


    useEffect(() => {
        const locState = location.state;
        if (locState && "message" in locState && locState.message) {
            setMessage({ status: true, message: locState.message })
        }

        const messageTimeOut = setTimeout(() => {
            setMessage({ status: false, message: "" });
        }, 5000)

        return () => messageTimeOut;

    }, [location.state]);


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
            {message.status && <MessagePopupModal message={message.message} />}
        </Main>
    );
};

function MainCards({ setMessage, setAuthCardState }) {

    const axios_ = useAuthAxios();
    const authState = useSelector((states) => states.authState);
    const [fetchedFeed, setFetchedFeed] = useState({ isLoading: false, others: {}, posts: [] });
    const [isLoading, setIsloading] = useState(true);

    const fetchNewsNextPage = useFetchPage(fetchedFeed, setFetchedFeed, setIsloading);
    useScrollState(fetchNewsNextPage);

    useEffect(() => {
        const fetchPost_ = genFetchPost
        const url = "/news/"

        if (authState.state) {
            fetchPost_(url, setFetchedFeed, axios_, () => setIsloading(false));
        } else {
            fetchPost_(url, setFetchedFeed, baseAxiosInstance, () => setIsloading(false));
        }
    }, [authState, axios_]);


    const newsCards = fetchedFeed.posts.map((item) => {
        return <NormalCard key={item.id} post={item} />
    });

    return (
        <section aria-label="news" className={`news ${styles.main__content}`}>
            <h4>News feed</h4>
            {!fetchedFeed.isLoading && fetchedFeed.posts.length !== 0 &&
                <div className={`main__grid ${styles.cards}`}>
                    {newsCards}
                </div>
            }
            {isLoading && <span className="loader"> <SpreadLoader /></span>}
        </section>
    )
}


export default Feed;