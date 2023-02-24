import { Link } from "react-router-dom";
import { formatDate, imageOrDefault, imgErrorHandler } from "utils/helpers";
import styles from "./styles/articlehead.module.css";

const DetailAggHeader = ({ post, type }) => {
    const profileUrl = `/source/${type}/${post.publisher}`;

    return (
        <div className={styles.article__header}>
            <Link to={profileUrl} >
                <img src={imageOrDefault(post.pub_image)} onError={imgErrorHandler} alt="creator" />
            </Link>
            <div className={styles.title}>
                <Link to={profileUrl}>
                    <strong>
                        {post.publisher}
                    </strong>
                </Link>
                <div>
                    {formatDate(post.date_published)}
                </div>
            </div>
        </div>
    );
};

export default DetailAggHeader;