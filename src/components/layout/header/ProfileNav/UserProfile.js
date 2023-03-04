import { BsCloudSun } from "react-icons/bs";
import { IoCloudyNightOutline } from "react-icons/io5";
import styles from "./styles/UserProfile.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { greeting } from "utils/helpers";

const UserProfile = ({ showNav }) => {
    const [profileImageError, setProfileImageError] = useState(false);
    const profileInfo = useSelector((states) => states.profileState.userInfo);
    const [period, setPeriod] = useState("");

    useEffect(() => {
        setPeriod(greeting());
        const interval = setInterval(() => setPeriod(greeting()), 2000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className={styles.profile__sec}>
            <div onClick={showNav} className={styles.img__wrapper}>
                {!profileImageError && <img src={profileInfo.image} onError={(e) => setProfileImageError(true)} alt="profile" />}
                {profileImageError && <h2 className="first__letter" >{profileInfo.username.toUpperCase()[0]}</h2>}
            </div>

            <div className={styles.greeting}>
                <h4>Hi {profileInfo.first_name}</h4>
                <p>
                    Good {period}!
                    <span></span>
                    {(period.toLowerCase() === "morning" || period.toLowerCase() === "afternoon") && <BsCloudSun className="morning__sun" />}
                    {period.toLowerCase() === "evening" && <IoCloudyNightOutline className="evening_time" />}
                </p>
            </div>
        </div>
    )
}


export default UserProfile;