
import styles from "./styles/notification.module.css";



const NoticationCard = ({title, date, username,imgSrc, readStatus}) => {


    // highlight un read nojtification
    // onClick mark as read if unread and then redirect
    // image src or first letter from username
    return (
        <div className={``}>
            <div className={``}>
                <img src="" alt="" />
            </div>
            <div className={``}>
                <p><strong>{username}</strong> {title}</p>
                <span>2h ago</span>
            </div>
        </div>
    )
};

export default NoticationCard;