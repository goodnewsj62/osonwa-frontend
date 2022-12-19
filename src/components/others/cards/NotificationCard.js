
import styles from "./styles/notification.module.css";
import img from "static/images/test_image.jpg"

const NoticationCard = ({data}) => {
    const {title, date, username,imgSrc, readStatus} =  data;

    // onClick mark as read if unread and then redirect
    // image src or first letter from username

    const bodyClasses =  readStatus ? `${styles.card__body}` : `${styles.card__body} ${styles.highlight}`;
    
    return (
        <div className={bodyClasses}>
            <div className={styles.img__box}>
                {img && <img src={img} alt="dp" />} {/* imgSrc */}
                {!img && <h2> {username.slice(0, 1)}</h2>}
            </div>
            <div className={styles.content__box}>
                <p><strong>{username}</strong> {title}</p>
                <span>2h ago</span>
            </div>
        </div>
    )
};

export default NoticationCard;