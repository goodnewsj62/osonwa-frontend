import { memo, useCallback, useEffect, useState } from "react";
import MyComments from "./MyComments";
import Posts from "./Posts";
import extstyles from "./styles/profile.module.css";
import styles from "./styles/body.module.css";
import { baseAxiosInstance } from "utils/requests";
import { useSelector } from "react-redux";
import useScrollState from "pages/hooks/scrollState";
import { useFetchPage } from "./helpers/fetchHelper";
import { genFetchPost } from "utils/helpers";
import useAuthAxios from "hooks/authAxios";


const ProfileBody = ({ state, username }) => {
    const [myposts, setMyposts] = useState({ isLoading: true, others: {}, posts: [] });
    const [mycomments, setMycomments] = useState({ isLoading: true, comments: [] });
    const [isLoadingNextPosts, setIsLoadingNextPosts] = useState(false);
    const [isLoadingNextComments, setIsLoadingNextComments] = useState(false);
    const authState = useSelector((states) => states.authState);
    const axios_ = useAuthAxios();


    const postIsSelected = useCallback(() => state === "posts", [state]);
    const fetchPage = useFetchPage(myposts, setMyposts, setIsLoadingNextPosts, postIsSelected);
    useScrollState(fetchPage);

    const commetSelected = useCallback(() => state === "comments", [state]);
    const fetchCommPage = useFetchPage(mycomments, setMycomments, setIsLoadingNextComments, commetSelected);
    useScrollState(fetchCommPage);


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
        const fetchComm = genFetchPost;
        let headers = { "Content-Type": "application/json" }
        headers = authState.state ? { ...headers, "Authorization": "Bearer " + authState.access } : headers;

        Promise.all([
            fetchposts(headers),
            fetchComm(`/comment/ucomments/?username=${username}`, setMycomments, axios_)
        ]);

    }, [fetchposts, authState.state, username, authState.access, axios_]);


    return (
        <section id="posts" className={`${extstyles.container} ${styles.container}`}>
            {state === "posts" &&
                <Posts posts={myposts.posts}
                    setPosts={setMyposts}
                    isLoading={myposts.isLoading}
                    isFetchingNext={isLoadingNextPosts}
                    usernameOnURL={username}
                />
            }
            {state === "comments" && <MyComments
                posts={mycomments.posts}
                setPosts={setMycomments}
                isLoading={MyComments.isLoading}
                isFetchingNext={isLoadingNextComments}
                usernameOnURL={username}
            />}
        </section>
    );
};

export default memo(ProfileBody);