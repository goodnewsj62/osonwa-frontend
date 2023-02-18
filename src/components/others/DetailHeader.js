import { Link } from "react-router-dom";
import { formatDate, imageOrDefault, imgErrorHandler } from "utils/helpers";
import styles from "./styles/articlehead.module.css";

const DetailHeader = ({ post }) => {
    const profileUrl = `/${post.author.username}`;

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
        </div>
    );
};

export default DetailHeader;