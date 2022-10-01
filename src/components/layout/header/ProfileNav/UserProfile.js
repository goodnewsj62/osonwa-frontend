import { BsCloudSun } from "react-icons/bs";
import { IoCloudyNightOutline } from "react-icons/io5";
import styles from "./styles/UserProfile.module.css";
import image from "static/images/test_image.png";

const UserProfile = ({ showNav }) => {
    return (
        <div className={styles.profile__sec}>
            <div onClick={showNav} className={styles.img__wrapper}>
                <img src={image} alt="profile" />
                <h2 className="first__letter">O</h2>
            </div>

            <div className={styles.greeting}>
                <h4>Hi Osonwa</h4>
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