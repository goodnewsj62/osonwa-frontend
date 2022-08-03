import { BsCloudSun } from "react-icons/bs";
import { IoCloudyNightOutline } from "react-icons/io5";
import { FcLike, FcFolder } from "react-icons/fc";
import image from "static/images/test_image.png";
import styles from "../styles/header/profile.module.css";

function ProfileNav(props) {
    return (
        <nav aria-label="profile navigation" className={styles.profile__options}>
            <div className={styles.profile__sec}>
                <div className={styles.img__wrapper}>
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
            <div className={styles.demacation}></div>
            <ul>
                <li>Profile</li>
                <li>Edit Profile</li>
                <li>Posts</li>
                <li>Social accounts</li>
            </ul>
            <div className={styles.demacation}></div>
            <ul className={styles.previous__actions}>
                <li>
                    <FcFolder size={20} />
                    <p>Saved</p>
                </li>
                <li>
                    <FcLike size={20} />
                    <p>Liked</p>
                </li>
            </ul>
            <div className={styles.demacation}></div>
            <ul className={styles.nav__last}>
                <li>
                    <div className={styles.appearance}>
                        <span>Apperance</span>
                        <div className={styles.toggle__apperance}>
                            <input type="checkbox" name="" id="mode" />
                            <label htmlFor="mode">
                                <span className={styles.ball}></span>
                            </label>
                        </div>
                    </div>
                </li>
                <li>Logout</li>
            </ul>
        </nav>
    )
}




function Profile(props) {
    return (
        <div className={styles.profile__div}>
                <img src={image} alt="profile" />
                <h2>O</h2>
            <ProfileNav />
        </div>
    )
}



export default Profile;