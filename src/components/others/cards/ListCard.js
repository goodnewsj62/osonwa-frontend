import { Link } from "react-router-dom";
import TagDiv from "../TagDiv";
import ListCardAction from "../Actions";
import styles from "./styles/listcard.module.css";
import image from "static/images/test_img.jpg";
import { memo } from "react";
import OwnerOptions from "../OwnerOptions";


const ListCard = ({ info }) => {
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
        starInfo,
        shareUrl,
        messageCallback,
        editUrl,
        postID,
        showOptions
    } = info;


    const formatDate = (isoString) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(isoString);
        return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
    };
    const defaultImage = (event) => {
        event.target.src = image;
    };

    const trimCharsTo = (string_, max_) => {
        if (string_.length >= max_) return string_.substring(0, max_) + '...'
        return string_
    };

    const imageOrDefault = (img) => {
        if (!img) return image;

        if (img.startsWith("http")) return img;

        return process.env.REACT_APP_BACKEND_URL + img;
    }

    return (
        <div className={styles.card__container}>
            <section className={styles.header}>
                <Link to={`/${publisherUrl}`}>
                    <img src={imageOrDefault(dpSrc)} onError={defaultImage} alt="publisher" />
                    <p>{publisher}</p>
                    <p><span>.</span>{formatDate(date)}</p>
                </Link>
                {showOptions && <OwnerOptions editUrl={editUrl} postID={postID} message={messageCallback} />}

            </section>
            <section className={styles.body}>
                {/* for p tag max 30 use js substring or split then add... if remaining text */}
                <Link to={`/${detailUrl}`}>
                    <h2>{trimCharsTo(title, 70)}</h2>
                    <p>{trimCharsTo(content, 180)}</p>
                </Link>
            </section>
            <aside className={styles.featured__image}>
                <img src={imageOrDefault(imgSrc)} onError={defaultImage} alt="featured" />
            </aside>
            <section className={styles.footer}>
                <TagDiv tagsInfo={tagsInfo} />
                <ListCardAction likeInfo={likeInfo} starInfo={starInfo} shareUrl={shareUrl} commentInfo={commentInfo} messenger={messageCallback} />
            </section>
        </div>
    )
};

export default memo(ListCard);