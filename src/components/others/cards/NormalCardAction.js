
import { BsDot } from "react-icons/bs";
import { RiShareForwardFill } from "react-icons/ri";

import style from "./styles/NormalCardAction.module.css";
import CommentComp from "../CommentComp";
import Likes from "../Likes";
import { formatDateText } from "utils/helpers";
import { useEffect, useState } from "react";
import MessagePopupModal from "../MessagePopupModal";



function NormalCardAction({ iconSize, post }) {
    const [message, setMessage] = useState({ status: false, message: "", category: "" });
    useEffect(() => {
        const timeout = setTimeout(() => setMessage({ status: false, message: "", category: "" }), 3000);
        return () => clearTimeout(timeout);
    }, [message])

    const detailUrl = `/aggregate/news/${post.slug_title}/${post.id}/`;
    const shareHandler = async (event) => {
        try {
            await window.navigator.clipboard.writeText(process.env.REACT_APP_DOMAIN + detailUrl);
            setMessage({ status: true, message: "link copied!", category: "success" });
        } catch (err) {
            setMessage({ status: true, message: "an error occured", category: "fail" });
        }
    };

    return (
        <div className={style.user__actions}>
            <div className={style.pub__date}>
                <BsDot className={style.bs__dot} size={30} />
                <span id="pub__date" >{formatDateText(post.date_published)}</span>
            </div>
            <ul>
                <li>
                    <CommentComp commentInfo={{ count: post.comments, detailUrl: `/aggregate/news/${post.slug_title}/${post.id}#comments` }} />
                </li>
                <li>
                    <Likes likeInfo={{ count: post.likes, type: "news", likeUrl: `/liked/${post.id}/`, is_liked: post.is_liked }} />
                </li>
                <li>
                    <div onClick={shareHandler}>
                        <RiShareForwardFill size={iconSize} />
                    </div>
                </li>
            </ul>
            {message.status && <MessagePopupModal message={message.message} category={message.category} />}
        </div>
    );
};



export default NormalCardAction;