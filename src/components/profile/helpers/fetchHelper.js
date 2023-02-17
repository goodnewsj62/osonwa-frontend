import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { baseAxiosInstance } from "utils/requests";

/* 
    fetchNextPage fetches the next page and appends results 
    to previous result 

    while other function checks if there is a next 
    page and if the  link of the next page has not already 
    been visted to aviod duplicate results
*/

export const useFetchPage = (myposts, setMyposts, setIsLoadingNextPosts, isSelected) => {
    const authState = useSelector((states) => states.authState);
    const previousUrl = useRef();

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
        const nextUrl = myposts.others.next;
        const hasNext = Object.keys(myposts.others).indexOf("next") !== -1;
        const isNewLink = previousUrl.current !== nextUrl;
        if (hasNext && isNewLink && nextUrl && isSelected()) {
            previousUrl.current = nextUrl;
            setIsLoadingNextPosts(true);
            fetchNextPage(nextUrl);
        }
    }, [myposts.others, fetchNextPage, setIsLoadingNextPosts, isSelected]);
};



export async function deletePost(id_, url, axios_, callback) {
    try {
        const resp = await axios_.delete(url);
        callback(id_);
        return resp
    } catch (err) { console.log(err.response); return err; }
}