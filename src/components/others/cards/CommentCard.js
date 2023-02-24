import { Link } from "react-router-dom";
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


const CommentCard = ({ comment, setComments }) => {
    const [message, setMessage] = useMessage();
    const axios_ = useAuthAxios();
    const profileUrl = `/${comment.created_by.username}`;
    const profileInfo = useSelector((states) => states.profileState);

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
            setComments((state) => {
                return {
                    ...state, posts: state.posts.filter((item) => item.id !== id)
                }
            })
        }
    }

    return (
        <>
            <div className={styles.container}>
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
                        <p>
                            <Link to={`/comment/${comment.id}`}>
                                <div dangerouslySetInnerHTML={{ __html: quillInstance.convert() }}>
                                </div>
                            </Link>
                        </p>
                        <div className={styles.reactions}>
                            <Likes likeInfo={{ count: comment.likes, type: "comment", likeUrl: `/liked/${comment.id}/`, is_liked: comment.is_liked }} />
                            <span>
                                <CommentComp commentInfo={{ count: comment.comments, detailUrl: `/comment/${comment.id}` }} />
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