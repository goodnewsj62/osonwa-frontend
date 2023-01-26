import { DefaultIconSize } from "components/wrappers/IconSize";
import MessagePopupModal from "components/others/MessagePopupModal";
import { useContext, useEffect, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";

import { HiPencil } from "react-icons/hi";
import SocialAccounts from "./SocialAccounts";
import TagSlide from "../others/carousel/TagsSlide";
import styles from "./styles/profile.module.css";
import ProfileEditPopup from "./ProfileEditPopup";
import TagPopup from "./TagPopup";

const ProfileHeader = ({ profileInfo, interests, isMyAccount }) => {
    const [message, setMessage] = useState({ state: false, type: "", message: "" });
    const [showProfileEdit, setShowProfileEdit] = useState(false);
    const [showTags, setShowTags] = useState(false);
    const iconSize = useContext(DefaultIconSize);

    useEffect(() => {
        const timeout = setTimeout(() => { setMessage({ state: false, message: "", type: "" }) }, 5000);
        return () => clearTimeout(timeout);
    }, [message.state]);


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
                        <button onClick={(e) => setShowProfileEdit(true)}>
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
                <button className={styles.add__tag} onClick={() => setShowTags(true)} type="button">
                    <BsPlusCircleFill size={iconSize + 6} />
                </button>
                <TagSlide tagArray={interests} />
            </div>
            {showProfileEdit && <ProfileEditPopup setShowState={setShowProfileEdit} setMessage={setMessage} />}
            {message.state && <MessagePopupModal message={message.message} category={message.type} />}
            {showTags && <TagPopup show={showTags} setShow={setShowTags} />}
        </section>
    )
};



export default ProfileHeader;