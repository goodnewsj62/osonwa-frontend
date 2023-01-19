import { MdCancel } from "react-icons/md";

import styles from "./styles/AuthCard.module.css";
import rocket from "static/images/Saly-43.png";
import { useEffect, useRef } from "react";
import { googleInit } from "components/auth/socialComponents/helpers/googlehelper";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { baseAxiosInstance } from "utils/requests";
import { authenticateUserAndRedirect } from "utils/helpers";

function AuthCard({ hideHandler, next }) {
    const buttonRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        googleInit("filled_blue", "standard", handleGoogleAuth, buttonRef);
    }, []);


    const handleGoogleAuth = async (resp) => {
        try {
            const response = await baseAxiosInstance.post(`/auth/google/`, { token: resp.credential }, {
                validateStatus: (status) => status < 400
            });

            if (response.status === 308) {
                const message = response.data.message;
                const state = { popStat: true, popEmail: message.email, popUrl: message.url, popCred: { token: resp.credential }, next: next };
                navigate("/signup", { state: state })
            } else {
                const next_location = next ? { "next": next } : {};
                authenticateUserAndRedirect(response.data.data, dispatch, navigate, next_location);
            }

        } catch (err) {
            navigate("/", { state: { message: "authentication failed." } });
        }
    };


    return (
        <div className={styles.auth__card} >
            <i onMouseDown={hideHandler} className={styles.cancel}>
                <MdCancel size={28} />
            </i>
            <div className={styles.auth__image} >
                <img src={rocket} alt="rocket" />
                <h4>Login to access this feature and many more</h4>
            </div>
            <div className={styles.auth__footer} >
                <div className={styles.action}>
                    <div ref={buttonRef}>

                    </div>
                    <span><Link to="/login"> Or sign up via other methods </Link></span>
                </div>
                <div>
                    Already have an account? <span><Link to="/login">Login</Link> </span>
                </div>
            </div>
        </div>
    );
};


export default AuthCard;