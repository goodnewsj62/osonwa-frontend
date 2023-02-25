import CommentCard from "./cards/CommentCard";

import styles from "./styles/comments.module.css";
import CommentForm from "./forms/CommentForm";
import { memo, useEffect, useState } from "react";
import { genFetchPost } from "utils/helpers";
import { useFetchPage } from "components/profile/helpers/fetchHelper";
import SpreadLoader from "./loaders/SpreadLoader";
import useScrollState from "pages/hooks/scrollState";
import useAuthAxios from "hooks/authAxios";




const Comments = ({ post, type, showForm = true, setExtra = {} }) => {
    const [comments, setComments] = useState({ isLoading: true, others: {}, posts: [] });
    const [isLoading, setIsLoading] = useState(true);
    const axios_ = useAuthAxios();


    const fetchPage = useFetchPage(comments, setComments, setIsLoading);
    useScrollState(fetchPage);

    useEffect(() => {
        const url = `/comment/?type=${type}&id=${post.id}`;
        genFetchPost(url, setComments, axios_, () => setIsLoading(false));
    }, [post, type, axios_]);


    useEffect(() => {
        if (Object.keys(setExtra).length > 0) {
            setComments((state) => ({ ...state, posts: [setExtra, ...state.posts] }));
        }
    }, [setExtra])



    const commentsCard = comments.posts.map((item) => {
        return <CommentCard comment={item} key={item.id} setComments={setComments} />;
    });


    return (
        <div id="comments">
            {showForm &&
                <div className={styles.comment}>
                    <CommentForm id={post.id} type={type} setComment={setComments} />
                </div>
            }
            {
                !comments.isLoading && comments.posts.length > 0 &&
                <div className={styles.comment__lists}>
                    {commentsCard}
                </div>
            }
            {
                isLoading && <span className="loader"><SpreadLoader /></span>
            }
        </div>
    );
};


export default memo(Comments);


