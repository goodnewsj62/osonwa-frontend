
import image from "static/images/test_image.png";
import styles from "./styles/profile.module.css";

import { memo } from "react";
import ProfileNav from "./ProfileNav";
import { useState } from "react";

import useHideOnClickedOutside from "utils/clickedOutside";



function Profile({ show, setShow, ...others }) {
    const [showProfileBar, setShowProfileBar] = useState(false);
    const modalRef = useHideOnClickedOutside(() => setShowProfileBar(false));

    const showProfileNavHandler = (event) => {
        setShowProfileBar((state) => !state);
    };

    return (
        <div ref={modalRef} data-testid="profileImage" className={styles.profile__div}>
            <img onClick={showProfileNavHandler} src={image} alt="profile img" />
            <h2 onClick={showProfileNavHandler} >O</h2>
            {showProfileBar && <ProfileNav showNav={setShowProfileBar} />}
        </div>
    );
};



export default memo(Profile);