import { useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { baseAxiosInstance } from "utils/requests";
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

    const handleGoogleAuth =  async (resp)=>{
        console.log(resp.credential);

        /*
            send credentials to backend 
            positive-response:
                save jwt token, change login status
                redirect to home or navigate to next
            negative pop up a message
        */
        try{
            const response =  await baseAxiosInstance.post("/auth/google", {token: resp.credential});
            console.log(response.data);
            return resp.data
        }catch(err){

        }
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