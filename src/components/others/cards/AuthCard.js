
import { FcGoogle } from "react-icons/fc";

import { MdCancel } from "react-icons/md";

import styles from "./styles/AuthCard.module.css";
import rocket from "static/images/Saly-43.png";
import { useContext } from "react";
import { DefaultIconSize } from "components/wrappers/IconSize";

function AuthCard({ hideHandler }) {

    const iconSize = useContext(DefaultIconSize);
    return (
        <div className={styles.auth__card} >
            <i onClick={hideHandler} className={styles.cancel}>
                <MdCancel size={28} />
            </i>
            <div className={styles.auth__image} >
                <img src={rocket} alt="rocket" />
                <h4>Login to access this feature and many more</h4>
            </div>
            <div className={styles.auth__footer} >
                <div className={styles.action}>
                    <button type="button">
                        <span><FcGoogle size={iconSize} /></span> Sign up with google
                    </button>
                    <span>Or sign up via other methods</span>
                </div>
                <div>
                    Already have an account? <span>Login </span>
                </div>
            </div>
        </div>
    );
};


export default AuthCard;