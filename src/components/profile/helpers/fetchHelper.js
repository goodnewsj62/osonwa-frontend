import { useCallback } from "react";
import { useSelector } from "react-redux";
import { baseAxiosInstance } from "utils/requests";

export const useFetchPage = (myposts, setMyposts, setIsLoadingNextPosts) => {
    const authState = useSelector((states) => states.authState);

    const fetchNextPage = useCallback(async (url) => {
        try {
            let headers = { "Content-Type": "application/json" }
            headers = authState.state ? { ...headers, "Authorization": "Bearer " + authState.access } : headers;
            const resp = await baseAxiosInstance.get(url, { headers: headers });
            const { results, ...others } = resp.data.data;
            setMyposts((state) => ({ isLoading: false, others: others, posts: [...state.posts, ...results] }));
            setIsLoadingNextPosts(false);
        } catch (err) {
            setIsLoadingNextPosts(false);
        }
    }, [authState.state, authState.access, setMyposts, setIsLoadingNextPosts])



    return useCallback(() => {
        const hasNext = Object.keys(myposts.others).indexOf("next") !== -1;
        if (hasNext && myposts.others.next) {
            setIsLoadingNextPosts(true);
            fetchNextPage(myposts.others.next);
        }
    }, [myposts.others, fetchNextPage, setIsLoadingNextPosts]);
};

