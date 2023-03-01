
import { Link } from "react-router-dom";
import styles from "./styles/notification.module.css";
const NoticationCard = ({ data }) => {
    const { title, date, username, imgSrc, readStatus, to } = data;

    // onClick mark as read if unread and then redirect
    // image src or first letter from username

    const bodyClasses = readStatus ? `${styles.card__body}` : `${styles.card__body} ${styles.highlight}`;
    const redirectHandler = () => { }

    return (
        <div onClick={redirectHandler} className={bodyClasses}>
            <div className={styles.img__box}>
                <Link to={`/${username}`}>
                    {imgSrc && <img src={imgSrc} alt="dp" />}
                    {!imgSrc && <h2> {username.slice(0, 1)}</h2>}
                </Link>
            </div>
            <Link to={to}>
                <div className={styles.content__box}>
                    <p><strong>{username}</strong> {title}</p>
                    <span>{date}</span>
                </div>
            </Link>
        </div>
    )
};

export default NoticationCard;