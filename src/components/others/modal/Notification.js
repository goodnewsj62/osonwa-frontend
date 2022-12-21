import NoticationCard from "../cards/NotificationCard";
import styles from "./styles/notification.module.css";
import img from "static/images/Umrella_Flatline.svg";

const NotificationBoard = () => {

    let displayData =  (
            <div className={styles.empty__notification}>
                <div className={styles.img__div}>
                    <img src={img} alt="" />
                    <p>
                        <strong>You are all caught up. Chill out</strong>
                        <i>no notifications</i>
                    </p>
                </div>
            </div>
            );

    const notifications = [1, 2, 3].map((not) => {
        const data = {
            title: "mentioned you",
            username: "someusername",
            date: "2022=02-04T22:07:22:0000Z",
            imgSrc: "99.897.89.45/someloc/img.jpg",
            readStatus: false
        }
        return <NoticationCard data={data} />
    });

    displayData =  <div className={styles.notifications}>{notifications}</div>;



    return (
        <section className={styles.modal}>
            <span>Notification</span>
            <div className={styles.modal__content}>
                {displayData}
            </div>
        </section>
    );
};

export default NotificationBoard;