import { memo, useCallback, useEffect, useMemo, useState } from "react";
import MyComments from "./MyComments";
import Posts from "./Posts";
import extstyles from "./styles/profile.module.css";
import styles from "./styles/body.module.css";
import { baseAxiosInstance } from "utils/requests";
import { useSelector } from "react-redux";
import useScrollState from "pages/hooks/scrollState";
import { useFetchPage } from "./helpers/fetchHelper";


const ProfileBody = ({ state, username }) => {
    const [myposts, setMyposts] = useState({ isLoading: true, others: {}, posts: [] });
    const [mycomments, setMycomments] = useState({ isLoading: true, comments: [] });
    const [isLoadingNextPosts, setIsLoadingNextPosts] = useState(false);
    const [isLoadingNextComments, setIsLoadingNextComments] = useState(false);
    const authState = useSelector((states) => states.authState);

    const postIsSelected = useCallback(() => state === "posts", [state]);
    const fetchPage = useFetchPage(myposts, setMyposts, setIsLoadingNextPosts, postIsSelected);
    useScrollState(fetchPage);


    const fetchposts = useCallback(async (headers) => {
        try {
            const resp = await baseAxiosInstance.get(`/blog/user-post/${username}/`, { headers: headers });
            const { results, ...others } = resp.data.data;
            setMyposts({ isLoading: false, others: others, posts: results });
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
            {state === "posts" && <Posts posts={myposts.posts} isLoading={myposts.isLoading} isFetchingNext={isLoadingNextPosts} />}
            {state === "comments" && <MyComments />}
        </section>
    );
};

export default memo(ProfileBody);