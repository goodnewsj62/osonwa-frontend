
import styles from "./styles/profile.module.css";

import { memo } from "react";
import ProfileNav from "./ProfileNav";
import { useState } from "react";

import useHideOnClickedOutside from "utils/clickedOutside";
import { useSelector } from "react-redux";



function Profile({ show, setShow, ...others }) {
    const [showProfileBar, setShowProfileBar] = useState(false);
    const [profileImageError, setProfileImageError] = useState(false);
    const modalRef = useHideOnClickedOutside(() => setShowProfileBar(false));
    const profileInfo = useSelector((states) => states.profileState.userInfo)

    const showProfileNavHandler = (event) => {
        setShowProfileBar((state) => !state);
    };


    return (
        <div ref={modalRef} data-testid="profileImage" className={styles.profile__div}>
            {!profileImageError && <img onClick={showProfileNavHandler} src={profileInfo.image} onError={(e) => setProfileImageError(true)} alt="profile img" />}
            {profileImageError && <h2 onClick={showProfileNavHandler} >{profileInfo.username.toUpperCase()[0]}</h2>}
            {showProfileBar && <ProfileNav showNav={setShowProfileBar} />}
        </div>
    );
};



export default memo(Profile);