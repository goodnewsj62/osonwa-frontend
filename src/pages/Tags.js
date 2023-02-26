import { useParams } from "react-router-dom";
import RenderListView from "components/others/RenderList";
import useAuthAxios from "hooks/authAxios";
import { useEffect, useState } from "react";
import useScrollState from "./hooks/scrollState";
import { useFetchPage } from "components/profile/helpers/fetchHelper";
import { genFetchPost } from "utils/helpers";
import ListCard from "components/others/cards/ListCard";
import { articlePostListAdapter, newsListAdapter } from "utils/adapters";
import Main from "components/others/MainWrapper";
import styles from "./styles/tags.module.css";




const Tags = () => {
    const { type, name } = useParams();

    const [posts, setPosts] = useState({ isLoading: true, others: {}, posts: [] });
    const [isLoadingNext, setIsLoadingNext] = useState(false);

    const axios_ = useAuthAxios();

    const fetchPage = useFetchPage(posts, setPosts, setIsLoadingNext);
    useScrollState(fetchPage);

    useEffect(() => {
        const fetch_ = genFetchPost;
        fetch_(`/tags/?type=${type}&name=${name}`, setPosts, axios_)
    }, [axios_, type, name]);


    const fetchedPosts = posts.posts.map((item) => {
        const info = type === "news" ? newsListAdapter(item) : articlePostListAdapter(item);
        console.log(item)
        return <ListCard info={info} key={item.id} />;
    });

    return (
        <Main>
            <div className={styles.container}>
                <section aria-labelledby="tagName" className={styles.header} >
                    <h1 id="tagName"> #{name}</h1>
                </section>
                <section className={styles.body}>
                    <RenderListView posts={fetchedPosts} isLoading={posts.isLoading} isFetchingNext={isLoadingNext}
                        message={"no post with tag name found"} classes={"_"} />
                </section>
            </div>
        </Main>
    )
};

export default Tags;