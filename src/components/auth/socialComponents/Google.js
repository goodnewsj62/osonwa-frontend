import { useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import styles from "../styles/socials.module.css";


const GoogleHandler = ({ setErrorInfo, size }) => {
    const buttonRef = useRef();
    useEffect(() => {
        window.onload = function () {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_G_CLIENT_ID,
                callback: handleGoogleAuth
            });
            window.google.accounts.id.renderButton(
                buttonRef.current, { theme: "outline", size: "large", type:"icon" })
        };
    }, []);

    const handleGoogleAuth =  (resp)=>{
        console.log(resp.credential)
    };

    return (
        <div  className={styles.google}>
            <div ref={buttonRef} className={styles.mask}>
            </div>
            <FcGoogle size={size} />
        </div>
    );
};

export default GoogleHandler;