import ApperanceAndLogout from "./ApperanceAndLogout";
import OtherNavOptions from "./OtherOptions";
import ProfileNavOptions from "./ProfileNavOptions";
import UserProfile from "./UserProfile";
import styles from "./styles/PNav.module.css";

const PNav = (props) => {
    <nav aria-label="profile navigation" className={styles.profile__options}>
        <UserProfile />
        <div className={styles.demacation}></div>
        <ProfileNavOptions />
        <div className={styles.demacation}></div>
        <OtherNavOptions />
        <div className={styles.demacation}></div>
        <ApperanceAndLogout />
    </nav>
}



export default PNav;