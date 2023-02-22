
import { BsDot } from "react-icons/bs";
import { RiShareForwardFill } from "react-icons/ri";

import style from "./styles/NormalCardAction.module.css";
import CommentComp from "../CommentComp";
import Likes from "../Likes";
import { formatDateText } from "utils/helpers";



function NormalCardAction({ iconSize, post }) {
    return (
        <div className={style.user__actions}>
            <div className={style.pub__date}>
                <BsDot className={style.bs__dot} size={30} />
                <span id="pub__date" >{formatDateText(post.date_published)}</span>
            </div>
            <ul>
                <li>
                    <CommentComp commentInfo={{}} />
                </li>
                <li>
                    <Likes likeInfo={{ count: post.likes, type: "news", likeUrl: `/liked/${post.id}/`, is_liked: post.is_liked }} />
                </li>
                <li>
                    <div>
                        <RiShareForwardFill size={iconSize} />
                    </div>
                </li>
            </ul>
        </div>
    );
};



export default NormalCardAction;