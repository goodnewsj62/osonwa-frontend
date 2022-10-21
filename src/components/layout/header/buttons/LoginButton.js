import styles from "../styles/nav.module.css";
import { useNavigate } from "react-router-dom";

const LoginLink = (props) => {
    const navigate = useNavigate()
    return (
        <li onClick={() => { navigate("/login") }} className={styles.auth}>
            <button className={`${styles.border__anime}`}>
                Login
            </button>
        </li>
    );
};



export default LoginLink;