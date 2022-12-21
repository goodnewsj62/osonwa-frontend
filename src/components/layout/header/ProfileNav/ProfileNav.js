import ApperanceAndLogout from "./ApperanceAndLogout";
import OtherNavOptions from "./OtherOptions";
import ProfileNavOptions from "./ProfileNavOptions";
import UserProfile from "./UserProfile";
import styles from "./styles/PNav.module.css";

function ProfileNav({ showNav }) {

    const showNavHandler = (event) => {
        setTimeout(() => { showNav(false) }, 530);
    };

    return (
        <nav aria-label="profile navigation" className={styles.profile__options}>
            <UserProfile showNav={showNavHandler} />
            <div className={styles.demacation}></div>
            <ProfileNavOptions showNav={showNavHandler} />
            <div className={styles.demacation}></div>
            <OtherNavOptions showNav={showNavHandler} />
            <div className={styles.demacation}></div>
            <ApperanceAndLogout showNav={showNavHandler} />
        </nav>
    );

};



export default ProfileNav;