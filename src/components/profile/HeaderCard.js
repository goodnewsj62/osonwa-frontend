import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext } from "react";
import { BsPlusCircleFill } from "react-icons/bs";

import { HiPencil } from "react-icons/hi";
import SocialAccounts from "./SocialAccounts";
import TagSlide from "../others/carousel/TagsSlide";
import styles from "./styles/profile.module.css";
import { useSelector } from "react-redux";

const ProfileHeader = (props) => {
    const iconSize = useContext(DefaultIconSize);
    const profileState = useSelector((states) => states.profileState);
    const profileInfo = profileState.userInfo;


    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <span></span>
                <div className={styles.profile__img}>
                    <img src={profileInfo.image} alt="profile" />
                </div>
                <div className={`${styles.edit__button}`}>
                    <button onClick={() => { }}>
                        <span>
                            Edit Profile
                        </span>
                        <i>
                            <HiPencil size={iconSize} />
                        </i>
                    </button>
                </div>
            </div>
            <div className={styles.bio}>
                <p>
                    {profileInfo.bio}
                </p>
            </div>
            <div className={styles.social__acc}>
                <SocialAccounts profileInfo={profileInfo} />
            </div>
            <div className={styles.tags}>
                <h4>Interests</h4>
                <button className={styles.add__tag} type="button">
                    <BsPlusCircleFill size={iconSize + 4} />
                </button>
                <TagSlide tagArray={profileState.interests} />
            </div>
        </section>
    )
};



export default ProfileHeader;