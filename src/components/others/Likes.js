import { DefaultIconSize } from "components/wrappers/IconSize";
import useAuthAxios from "hooks/authAxios";
import { memo, useContext, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { shortenCount, toggleAction } from "utils/helpers";
import styles from "./styles/actioncomp.module.css";




const Likes = ({ likeInfo: { count, type, likeUrl, is_liked }, message, postID }) => {
    const [likeCount, setLikeCount] = useState(count);
    const [likeStatus, setLikeStatus] = useState(is_liked);
    const iconSize = useContext(DefaultIconSize);
    const axios_ = useAuthAxios();

    function rejectHandler(value) {
        /* setLikeStatusAndCount has made like status change for speed reasons
                so we invert the logic here to reset to previous state
                since request failed
            */
        if (likeStatus) {
            setLikeStatus(false);
            setLikeCount((count) => (count - 1));
        } else {
            setLikeStatus(true);
            setLikeCount((count) => (count + 1));
        }
    }

    function setLikeStatusAndCount() {
        if (!likeStatus) {
            setLikeStatus(true);
            setLikeCount((count) => (count + 1));
        }
        else {
            setLikeStatus(false);
            setLikeCount((count) => (count - 1));
        }
    }


    const likeOrUnlike = (event) => {
        setLikeStatusAndCount()
        toggleAction(axios_, likeUrl, type, rejectHandler)
            .then((resp) => {
                if (resp.status === 200 && message) {
                    message(resp.data.message.startsWith("like") ? "like" : "unlike", postID);
                }
            });
    };

    const formatCount = (count) => shortenCount(count);

    return (
        <div onClick={likeOrUnlike} className={styles.likes}>
            <div className={styles.icon}>
                {!likeStatus && <AiOutlineHeart size={iconSize} />}
                {likeStatus && <AiFillHeart fill="#EE527F" size={iconSize} />}
            </div>
            <div className={`${styles.count} cnt`}>
                {formatCount(likeCount)}
            </div>
        </div>
    );
};

export default memo(Likes);