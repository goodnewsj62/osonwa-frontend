import { Link } from "react-router-dom";
import { formatDate, imageOrDefault } from "utils/helpers";
import CommentComp from "../CommentComp";
import Likes from "../Likes";
import image from "static/images/test_img.jpg";

import styles from "./styles/comment.module.css";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";


const CommentCard = ({ comment }) => {


    const profileUrl = `/${comment.created_by.username}`;
    const handleError = (event) => {
        event.target.src = image;
    }

    const quillInstance = new QuillDeltaToHtmlConverter(comment.content ? comment.content.ops : [])

    return (
        <div className={styles.container}>
            <div >
                <div className={styles.img__block}>
                    <Link to={profileUrl}>
                        <img src={imageOrDefault(comment.created_by.profile.image)}
                            onError={handleError}
                            alt="profile" />
                    </Link>
                </div>
                <div className={styles.main__block}>
                    <div className={styles.header}>
                        <Link to={profileUrl}>
                            <strong>{comment.created_by.username}</strong>
                        </Link>
                        <span>{formatDate(comment.date_created)}</span>
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
    )
}


export default CommentCard;