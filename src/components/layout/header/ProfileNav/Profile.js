
import image from "static/images/test_image.png";
import styles from "./styles/profile.module.css";

import { memo } from "react";
import ProfileNav from "./ProfileNav";


function Profile({ show, setShow, ...others }) {
    return (
        <div className={styles.profile__div}>
            <img onClick={(e) => { setShow(!show) }} src={image} alt="profile" />
            <h2 onClick={(e) => { setShow(!show) }} >O</h2>
            <ProfileNav show={show} setShow={setShow} />
        </div>
    );
};



export default memo(Profile);