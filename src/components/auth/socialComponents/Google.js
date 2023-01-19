import { useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticateUserAndRedirect, setStandardError } from "utils/helpers";
import { baseAxiosInstance } from "utils/requests";
import styles from "../styles/socials.module.css";
import { googleInit } from "./helpers/googlehelper";


const GoogleHandler = ({ setErrorInfo, size, setRegister, setLoader, type }) => {
    const buttonRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();



    useEffect(() => {
        const theme = type === "rect" ? "filled_blue" : "outline";
        const type_ = type === "rect" ? "standard" : "icon";
        googleInit(theme, type_, handleGoogleAuth, buttonRef);
    }, []);



    const handleGoogleAuth = async (resp) => {

        /*
            send credentials to backend 
            positive-response:
                save jwt token, change login status
                redirect to home or navigate to next
            negative pop up a message
        */
        setLoader(true);

        try {
            const response = await baseAxiosInstance.post(`/auth/google/`, { token: resp.credential }, {
                validateStatus: (status) => status < 400
            });

            if (response.status === 308) {
                const message = response.data.message;
                setRegister({ state: true, email: message.email, cred: { token: resp.credential }, url: message.url });
            } else {
                authenticateUserAndRedirect(response.data.data, dispatch, navigate, location.state);
            }

        } catch (err) {
            setStandardError(setErrorInfo, err);
        }

        setLoader(false);
    };


    const containerStyle = type === "rect" ? styles.google__rect : styles.google;
    const holderStyle = type === "rect" ? styles.holder : styles.mask;

    return (
        <div className={containerStyle}>
            <div ref={buttonRef} className={holderStyle}>
            </div>
            {type !== "rect" && <FcGoogle size={size} />}
        </div>
    );
};

export default GoogleHandler;