import { useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticateUserAndRedirect } from "utils/helpers";
import { baseAxiosInstance } from "utils/requests";
import styles from "../styles/socials.module.css";


const GoogleHandler = ({ setErrorInfo, size, setRegister }) => {
    const buttonRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        window.onload = function () {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_G_CLIENT_ID,
                callback: handleGoogleAuth
            });
            window.google.accounts.id.renderButton(
                buttonRef.current, { theme: "outline", size: "large", type: "icon" })
        };
    }, []);



    const handleGoogleAuth = async (resp) => {

        /*
            send credentials to backend 
            positive-response:
                save jwt token, change login status
                redirect to home or navigate to next
            negative pop up a message
        */
        try {
            const response = await baseAxiosInstance.post(`/auth/google/`, { token: resp.credential }, {
                validateStatus: (status) => status < 400
            });

            if (response.status === 308) {
                const message = response.data.message;
                setRegister({ state: true, email: message.email, cred: resp.credential, url: message.url });
            } else {
                authenticateUserAndRedirect(response.data.data, dispatch, navigate, location.state);
            }

        } catch (err) {
            if (err.response.status >= 500) { //TODO: create standard error variables
                setErrorInfo({ state: true, message: "oops an error occurred in our system" });
            } else if (err.response.status >= 400 && err.response.status < 500) {
                setErrorInfo({ state: true, message: err.response.data.message.error });
            } else if (err.request) {
                setErrorInfo({ state: true, message: "request not sent. tip: check if you're connected to the internet" });
            }
        }
    };



    return (
        <div className={styles.google}>
            <div ref={buttonRef} className={styles.mask}>
            </div>
            <FcGoogle size={size} />
        </div>
    );
};

export default GoogleHandler;