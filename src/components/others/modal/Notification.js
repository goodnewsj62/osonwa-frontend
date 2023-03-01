import NoticationCard from "../cards/NotificationCard";
import styles from "./styles/notification.module.css";
import img from "static/images/Umrella_Flatline.svg";
import { formatDateText, imageOrDefault } from "utils/helpers";
// import SpreadLoader from "../loaders/SpreadLoader";

const NotificationBoard = ({ info }) => {

    const notifications = info.posts.map((item) => {
        const title = {
            mention: "mentioned you in a comment",
            comment: "commented on your post",
            react: `liked your ${item.content_object.name}`
        }[item.action]

        const redirecturl = {
            mention: () => `/comment/${item.content_object.id}`,
            comment: () => `/comment/${item.content_object.id}`,
            react: () => {
                if (Object.keys(item.content_object).indexOf("post_id") !== -1)
                    return `/article/${item.content_object.slug_title}/${item.content_object.post_id}`
                else
                    return `/comment/${item.content_object.id}`
            }
        }[item.action]()
        const data = {
            title: title,
            username: item.action_by.username,
            date: formatDateText(item.date_created),
            imgSrc: imageOrDefault(item.action_by.profile.image),
            readStatus: item.is_read,
            to: redirecturl
        }
        return <NoticationCard data={data} key={item.id} />
    });

    const displayData = <div className={styles.notifications}>{notifications}</div>;


    return (
        <section className={styles.modal}>
            <span>Notification</span>
            <div className={styles.modal__content}>
                {info.posts.length > 0 && displayData}
                {!info.posts.length &&
                    <div className={styles.empty__notification}>
                        <div className={styles.img__div}>
                            <img src={img} alt="" />
                            <p>
                                <strong>You are all caught up. Chill out</strong>
                                <i>no notifications</i>
                            </p>
                        </div>
                    </div>
                }
            </div>
            {/* {isLoading && <span className="loader"><SpreadLoader /></span>} */}
        </section>
    );
};

export default NotificationBoard;