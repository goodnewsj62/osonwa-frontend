import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatDate, imageOrDefault, imgErrorHandler } from "utils/helpers";
import CommentComp from "../CommentComp";
import Likes from "../Likes";

import styles from "./styles/comment.module.css";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import OwnerOptions from "../OwnerOptions";
import { useSelector } from "react-redux";
import useMessage from "hooks/messageHook";
import useAuthAxios from "hooks/authAxios";
import MessagePopup from "./MessagePopupCard";
import { useContext } from "react";
import { mention } from "pages/CommentDetail";


const CommentCard = ({ comment, setComments, classes = null }) => {
    const [message, setMessage] = useMessage();
    const axios_ = useAuthAxios();
    const profileUrl = `/${comment.created_by.username}`;
    const profileInfo = useSelector((states) => states.profileState);
    const setReplyTo = useContext(mention);

    const location = useLocation();
    const navigate = useNavigate();

    const quillInstance = new QuillDeltaToHtmlConverter(comment.content ? comment.content.ops : []);
    const showOptions = comment.created_by.id === profileInfo.userInfo.id;

    const messageCallback = async (message, id) => {
        try {
            const resp = await axios_.delete(`/comment/${id}/`);
            setMessage({ message: "comment deleted", category: "success", status: true });
            applyEffect(setComments, id);
            return resp
        } catch (err) {
            setMessage({ message: "an error occurred", category: "failure", status: true });
            return err;
        }
    };

    function applyEffect(setState, id) {
        if (setState) {
            setState((state) => {
                return {
                    ...state, posts: state.posts.filter((item) => item.id !== id)
                }
            })
        }
    }


    function commentHandler() {
        // for comment of comment when you click comment and it's not in the
        //detail page of parent then navigate to detail page of parent with a
        // reply to the creator of this comment
        const commentParentUrl = `/comment/${comment.content_object.id}`;
        if (location.pathname !== commentParentUrl) {
            navigate(commentParentUrl, { state: { username: comment.created_by.username } });
        } else if (setReplyTo) {
            setReplyTo(comment.created_by.username);
        }
    }

    return (
        <>
            <div className={`${styles.container} ${classes ? classes : ""}`}>
                <div>
                    <div className={styles.img__block}>
                        <Link to={profileUrl}>
                            <img src={imageOrDefault(comment.created_by.profile.image)}
                                onError={imgErrorHandler}
                                alt="profile" />
                        </Link>
                    </div>
                    <div className={styles.main__block}>
                        <div className={styles.header}>
                            <Link to={profileUrl}>
                                <strong>{comment.created_by.username}</strong>
                            </Link>
                            <span>{formatDate(comment.date_created)}</span>
                            {showOptions && <OwnerOptions editUrl={`edit/comment/${comment.id}`} postID={comment.id} message={messageCallback} />}
                        </div>
                        <div className={styles.content__text}>
                            {/* two way nesting comment of comment cannot have link */}
                            {comment.content_type !== "comment" ?

                                <Link to={`/comment/${comment.id}`}>
                                    <div dangerouslySetInnerHTML={{ __html: quillInstance.convert() }}>
                                    </div>
                                </Link>
                                :
                                <div dangerouslySetInnerHTML={{ __html: quillInstance.convert() }}>
                                </div>
                            }
                        </div>
                        <div className={styles.reactions}>
                            <Likes likeInfo={{ count: comment.likes, type: "comment", likeUrl: `/liked/${comment.id}/`, is_liked: comment.is_liked }} />
                            <span>
                                <CommentComp commentInfo={{ count: comment.comments, detailUrl: comment.content_type !== "comment" ? `/comment/${comment.id}` : "" }} clickHandler={commentHandler} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {message.status && <MessagePopup message={message.message} category={message.category} />}
        </>
    )
}


export default CommentCard;