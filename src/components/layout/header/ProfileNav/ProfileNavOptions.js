import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import styles from "./styles/PNav.module.css";




const ProfileNavOptions = ({ showNav }) => {
    const profileInfo = useSelector((states) => states.profileState.userInfo);
    const navigate = useNavigate();

    const handlePassChange = (event) => {
        const payload = { email: profileInfo.email };
        const action = "continue with your password change";
        const url = "/change-password/"
        navigate("/email/request", { state: { payload: payload, action: action, url: url } });
    };

    return (
        <ul onClick={showNav} className={styles.ul_opt}>
            <li><Link to={`/${profileInfo.username}`}>Profile</Link></li>
            <li><Link to={`/${profileInfo.username}#posts`}>Posts</Link></li>
            <li onClick={handlePassChange}>Change Password</li>
        </ul>
    );
};



export default ProfileNavOptions;