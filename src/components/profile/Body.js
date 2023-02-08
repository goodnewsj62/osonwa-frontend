import { memo, useCallback, useEffect, useState } from "react";
import MyComments from "./MyComments";
import Posts from "./Posts";
import extstyles from "./styles/profile.module.css";
import styles from "./styles/body.module.css";
import useAuthAxios from "hooks/authAxios";


const ProfileBody = ({ state }) => {
    const [myposts, setMyposts] = useState({ isLoading: true, posts: [] });
    const [mycomments, setMycomments] = useState({ isLoading: true, comments: [] });
    const axios_ = useAuthAxios();


    const fetchposts = useCallback(async () => {
        try {
            const resp = axios_.get("/blog/post/", { Headers: { "Content-Type": "application/json" } });
            setMyposts({ isLoading: false, posts: resp.data.data.results });
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