import { memo, useCallback, useEffect, useMemo, useState } from "react";
import MyComments from "./MyComments";
import Posts from "./Posts";
import extstyles from "./styles/profile.module.css";
import styles from "./styles/body.module.css";
import { baseAxiosInstance } from "utils/requests";
import { useSelector } from "react-redux";


const ProfileBody = ({ state, username }) => {
    const [myposts, setMyposts] = useState({ isLoading: true, others: {}, posts: [] });
    const [mycomments, setMycomments] = useState({ isLoading: true, comments: [] });
    const authState = useSelector((states) => states.authState);




    const fetchposts = useCallback(async (headers) => {
        try {
            const resp = await baseAxiosInstance.get(`/blog/user-post/${username}/`, { headers: headers });
            const { results, ...others } = resp.data.data;
            setMyposts({ isLoading: false, other: others, posts: results });
        } catch (error) {
            setMyposts((state) => ({ ...state, isLoading: false }));
        }
    }, [username]);


    useEffect(() => {
        let headers = { "Content-Type": "application/json" }
        headers = authState.state ? { ...headers, "Authorization": "Bearer " + authState.access } : headers;
        fetchposts(headers);
    }, [fetchposts, authState.state, authState.access]);


    return (
        <section id="posts" className={`${extstyles.container} ${styles.container}`}>
            {state === "posts" && <Posts posts={myposts.posts} isLoading={myposts.isLoading} />}
            {state === "comments" && <MyComments />}
        </section>
    );
};

export default memo(ProfileBody);