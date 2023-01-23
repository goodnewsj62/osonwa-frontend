import { DefaultIconSize } from "components/wrappers/IconSize";
import { useContext, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";

import { HiPencil } from "react-icons/hi";
import SocialAccounts from "./SocialAccounts";
import TagSlide from "../others/carousel/TagsSlide";
import styles from "./styles/profile.module.css";
import ProfileEditPopup from "./ProfileEditPopup";

const ProfileHeader = ({ profileInfo, interests, isMyAccount }) => {
    const [showProfileEdit, setShowProfileEdit] = useState(false);
    const iconSize = useContext(DefaultIconSize);


    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <span></span>
                <div className={styles.profile__img}>
                    <img src={profileInfo.image} alt="profile" />
                </div>
                {
                    isMyAccount &&
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
                }
            </div>
            <div className={styles.user__info}>
                <span className={styles.name}>
                    <strong>
                        {profileInfo.first_name} {profileInfo.last_name}
                    </strong>
                </span>
                <span className={styles.username}>@{profileInfo.username}</span>
            </div>
            <div className={styles.bio} style={{ display: profileInfo.bio ? "initial" : "none" }}>
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
                <TagSlide tagArray={interests} />
            </div>
            {showProfileEdit && <ProfileEditPopup setShowState={setShowProfileEdit} />}
        </section>
    )
};



export default ProfileHeader;