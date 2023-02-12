import { DefaultIconSize } from "components/wrappers/IconSize";
import useAuthAxios from "hooks/authAxios";
import { useContext, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toggleAction } from "utils/helpers";
import styles from "./styles/actioncomp.module.css";




const Likes = ({ likeInfo: { count, type, likeUrl, is_liked } }) => {
    const [likeStatus, setLikeStatus] = useState(is_liked);
    const iconSize = useContext(DefaultIconSize);
    const axios_ = useAuthAxios();


    const likeOrUnlike = (event) => toggleAction(axios_, likeUrl, type, setLikeStatus);

    return (
        <div onClick={likeOrUnlike} className={styles.likes}>
            <div className={styles.icon}>
                {!likeStatus && <AiOutlineHeart size={iconSize} />}
                {likeStatus && <AiFillHeart fill="#EE527F" size={iconSize} />}
            </div>
            <div className={`${styles.count} cnt`}>
                {count}
            </div>
        </div>
    );
};

export default Likes;