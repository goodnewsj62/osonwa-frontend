import styles from "../styles/nav.module.css";

const LoginLink = (props) => {
    return (
        <li onClick={() => { }} className={styles.auth}>
            <button className={`${styles.border__anime}`}>
                Login
            </button>
        </li>
    );
};



export default LoginLink;