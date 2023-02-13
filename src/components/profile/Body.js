import { memo, useCallback, useEffect, useState } from "react";
import MyComments from "./MyComments";
import Posts from "./Posts";
import extstyles from "./styles/profile.module.css";
import styles from "./styles/body.module.css";
import { baseAxiosInstance } from "utils/requests";


const ProfileBody = ({ state, username }) => {
    const [myposts, setMyposts] = useState({ isLoading: true, others: {}, posts: [] });

    const [mycomments, setMycomments] = useState({ isLoading: true, comments: [] });


    const fetchposts = useCallback(async () => {
        try {
            const resp = await baseAxiosInstance.get(`/blog/user-post/${username}/`, { Headers: { "Content-Type": "application/json" } });
            const { results, ...others } = resp.data.data;
            setMyposts({ isLoading: false, other: others, posts: results });
        } catch (error) {
            setMyposts((state) => ({ ...state, isLoading: false }));
        }
    }, [username]);


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