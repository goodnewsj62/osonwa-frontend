import { BsCloudSun } from "react-icons/bs";
import { IoCloudyNightOutline } from "react-icons/io5";
import styles from "./styles/UserProfile.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const UserProfile = ({ showNav }) => {
    const [profileImageError, setProfileImageError] = useState(false);
    const profileInfo = useSelector((states) => states.profileState.userInfo);


    return (
        <div className={styles.profile__sec}>
            <div onClick={showNav} className={styles.img__wrapper}>
                {!profileImageError && <img src={profileInfo.image} onError={(e) => setProfileImageError(true)} alt="profile" />}
                {profileImageError && <h2 className="first__letter" >{profileInfo.username.toUpperCase()[0]}</h2>}
            </div>

            <div className={styles.greeting}>
                <h4>Hi {profileInfo.first_name}</h4>
                <p>
                    Good Morning!
                    <span></span>
                    <BsCloudSun className="morning__sun" />
                    <IoCloudyNightOutline className="evening_time" />
                </p>
            </div>
        </div>
    )
}


export default UserProfile;