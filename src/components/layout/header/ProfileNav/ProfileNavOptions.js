import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./styles/PNav.module.css";




const ProfileNavOptions = ({ showNav }) => {
    const profileInfo = useSelector((states) => states.profileState.userInfo);

    return (
        <ul onClick={showNav} className={styles.ul_opt}>
            <li><Link to={`/${profileInfo.username}`}>Profile</Link></li>
            <li>Edit Profile</li>
            <li>Posts</li>
            <li>Change Password</li>
        </ul>
    );
};



export default ProfileNavOptions;