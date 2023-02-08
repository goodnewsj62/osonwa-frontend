import { Link } from "react-router-dom";
import dummy from "static/images/test_img.jpg";
import TagDiv from "../TagDiv";
import ListCardAction from "../Actions";
import styles from "./styles/listcard.module.css";


const ListCard = (props) => {
    const {
        detailUrl,
        imgSrc,
        dpSrc,
        publisher,
        publisherUrl,
        date,
        title,
        content,
        tagsInfo,
        likeInfo,
        commentInfo,
        shareUrl } = props

    const formatDate = () => {

    };
    const defaultImage = () => {

    };

    const trimCharsTo = (title, max_) => {

    };

    return (
        <div className={styles.card__container}>
            <section className={styles.header}>
                <Link to={`/${publisherUrl}`}>
                    <img src={dpSrc} onError={defaultImage} alt="publisher" />
                    <p>{publisher}</p>
                    <p><span>.</span>jun 13 2022 {formatDate(date)}</p>
                </Link>
            </section>
            <section className={styles.body}>
                {/* for p tag max 30 use js substring or split then add... if remaining text */}
                <Link to={`/${detailUrl}`}>
                    <h2>{trimCharsTo(title, 70)}</h2>
                    <p>{trimCharsTo(content, 180)}</p>
                </Link>
            </section>
            <aside className={styles.featured__image}>
                <img src={imgSrc} onError={defaultImage} alt="featured" />
            </aside>
            <section className={styles.footer}>
                <TagDiv tagsInfo={tagsInfo} />
                <ListCardAction likeInfo={likeInfo} shareUrl={shareUrl} commentInfo={commentInfo} />
            </section>
        </div>
    )
};

export default ListCard;