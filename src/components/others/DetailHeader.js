import { MdModeEditOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate, imageOrDefault, imgErrorHandler } from "utils/helpers";
import styles from "./styles/articlehead.module.css";

const DetailHeader = ({ post, authState }) => {
    const profileUrl = `/${post.author.username}`;
    const profile = useSelector((states) => states.profileState);

    return (
        <div className={styles.article__header}>
            <Link to={profileUrl} >
                <img src={imageOrDefault(post.author.profile.image)} onError={imgErrorHandler} alt="creator" />
            </Link>
            <div className={styles.title}>
                <Link to={profileUrl}>
                    <strong>
                        {post.author.first_name + " " + post.author.last_name}
                    </strong>
                </Link>
                <div>
                    {formatDate(post.date_updated)}
                </div>
            </div>
            {
                authState.state && profile.userInfo.id === post.author.id &&
                <Link to={`/edit/${post.slug_title}/${post.post_id}`} className={styles.lnk__button}>
                    <span>Edit Post</span>
                    <i><MdModeEditOutline size={18} /></i>
                </Link>
            }
        </div>
    );
};

export default DetailHeader;