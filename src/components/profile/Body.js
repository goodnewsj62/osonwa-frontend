import { memo, useCallback, useEffect, useState } from "react";
import MyComments from "./MyComments";
import Posts from "./Posts";
import extstyles from "./styles/profile.module.css";
import styles from "./styles/body.module.css";
import useAuthAxios from "hooks/authAxios";


const ProfileBody = ({ state }) => {
    const [myposts, setMyposts] = useState({ isLoading: true, others: {}, posts: [] });

    const [mycomments, setMycomments] = useState({ isLoading: true, comments: [] });
    const axios_ = useAuthAxios();


    const fetchposts = useCallback(async () => {
        try {
            const resp = await axios_.get("/blog/post/", { Headers: { "Content-Type": "application/json" } });
            const { results, ...others } = resp.data.data;
            console.log(resp.data.data.results)
            setMyposts({ isLoading: false, other: others, posts: results });
        } catch (error) {
            setMyposts((state) => ({ ...state, isLoading: false }));
        }
    }, [axios_]);


    useEffect(() => {
        fetchposts();
    }, [fetchposts]);


    return (
        <section id="posts" className={`${extstyles.container} ${styles.container}`}>
            {state === "posts" && <Posts posts={myposts.posts} isLoading={myposts.isLoading} />}
            {state === "comments" && <MyComments />}
        </section>
    );
};

export default memo(ProfileBody);